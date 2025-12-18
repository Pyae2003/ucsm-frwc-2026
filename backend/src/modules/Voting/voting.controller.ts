import { NextFunction, Request, Response } from "express";
import { AppError } from "../../middleware/error.middleware.js";
import { prisma } from "../../config/database.js";
import { sendSuccess } from "../../utils/response.js";
import { candidatesStatistic, votingCategoriesQueryInput, votingSchemaInput } from "./voting.schema.js";


const VotingController = {
    voting : async(
        req : Request<object,object,object, votingSchemaInput>,
        res : Response,
        next : NextFunction,
    ) : Promise<void> => {
        try{
            const { voter , category, nomineeId } = (req as any).validatedQuery;
            console.log(voter, category, nomineeId);
            
            if( !voter || !category || !nomineeId ){
                throw new AppError("Voter, category and nomineeId are required", 400);
            };

            //check if the voter exists
            const check_voter = await prisma.voter.findUnique({
                where : { serial : voter},
            });

            if ( !check_voter ){
                throw new AppError("Voter not found", 404);
            };

            // Find category by name to get its ID
            const check_category = await prisma.category.findUnique({
                where : { name : category},
            });

            if ( !check_category ){
                throw new AppError("Category not found", 404);
            };

            //check if the nomineeId exists in the specified category
            const check_nomineeId = await prisma.candidate.findFirst({
                where : { 
                    nomineeId : nomineeId,
                    categoryId : check_category.id,
                },
            });

            if( !check_nomineeId ){
                throw new AppError("NomineeId not found", 404);
            };

            //check if the voter has already voted for this category
            const check_already_voted = await prisma.vote.findFirst({
                where : { 
                    voterId : check_voter.id , 
                    categoryId : check_category.id,
                },
            });
             
           if(check_already_voted){
              if(check_already_voted.candidateId === check_nomineeId.id){
                const cancel_vote = await prisma.vote.delete({
                    where : { 
                        id : check_already_voted.id,
                    },
                  });
                  sendSuccess(res,cancel_vote, "Vote cancelled successfully");
              }else{
                await prisma.$transaction([
                    prisma.vote.delete({
                        where : { 
                            id : check_already_voted.id,
                        },
                    }),
                    prisma.vote.create({
                        data : {
                            voterId : check_voter.id,
                            candidateId : check_nomineeId.id,
                            categoryId : check_category.id,
                        }
                    })
                ]);
                sendSuccess(res,null, "Vote updated successfully");
              }
            //   return;
           }

            const vote = await prisma.vote.create({
                data : {
                    voterId : check_voter.id,
                    candidateId : check_nomineeId.id,
                    categoryId : check_category.id,
                }
            });

            sendSuccess(res,vote, "Vote cast successfully");
        }catch(error){
            console.log("Voting Error" , error);
            next(error);
        }
    },

    getVotes: async(
        _req : Request,
        res : Response,
        next : NextFunction,
    ) : Promise<void> => {
        try{
            const votes = await prisma.vote.findMany();
            sendSuccess(
                res,
                votes,
                "Votes fetched successfully!",
            );

        }catch(error){
            console.log("Get Votes Error" , error);
            next(error);
        }
    }
    ,
    votesStatistics : async(
        req : Request<object,object,object,votingCategoriesQueryInput>,
        res : Response,
        next : NextFunction,
    ) : Promise<void> => {
        try{
            const { category } = (req as any).validatedQuery;

            console.log(category);
            // fetch candidates for the given category
            const candidates = await prisma.candidate.findMany({
                where : category ? { category : {name : category} } : {},
                select : {
                    id : true,
                    nomineeId : true,
                    name : true,
                    categoryId : true,
                    category :{
                        select : {
                            name : true,
                        }
                    },
                    _count : {
                        select : {votes : true}
                    }
                },
                orderBy : {
                    votes : {_count : "desc"}
                }
            });

           //Result structure 
           const result : Record<string, candidatesStatistic[]> = {};

           candidates.forEach((candidate) => {
              if(!result[candidate.category.name]){
                  result[candidate.category.name]  = [] ;
              };
              result[candidate.category.name].push({
                candidateId : candidate.categoryId,
                name : candidate.name,
                nomineeId : candidate.nomineeId,
                votes : candidate._count.votes,
              })
           });

           sendSuccess(
            res,
            result,
            "Votes statistics fetched successfully!"
           )


        }catch(error){
            console.log("Votes Statistics Error" , error);
            next(error);
        }
    },


}

export default VotingController;