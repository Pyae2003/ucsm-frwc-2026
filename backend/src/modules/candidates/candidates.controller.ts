import { NextFunction ,Request,Response} from "express";
import { prisma } from "../../config/database.js";
import { sendSuccess } from "../../utils/response.js";
import { CreateCandidatesValidatorInput, UpdateCandidatesValidatorInput } from "./candidates.schema.js";
import { AppError } from "../../middleware/error.middleware.js";


const candidatesController = {
    GettingAllCandidates : async (_req : Request, res : Response , next : NextFunction) => {
        try{

            const AllCandidates = await prisma.candidate.findMany({
                orderBy : {
                    createdAt : "asc"
                }
            });

            sendSuccess( 
                res ,
                AllCandidates,
                "Data Getting success"
            )

        }catch(error){
            console.log("All Candidates Getting Error!" ,error) ;
            next(error)
        }
    },
    addedCandidates : async (
        req : Request <object,object,CreateCandidatesValidatorInput>, 
        res : Response , 
        next : NextFunction
        ) : Promise<void> => {
            try{
                const { nomineeId , name } = req.body;

                if( !nomineeId || !name ){
                    throw new AppError("Please fill fully nomineeId and name!",400);
                };

                const addedCan = await prisma.candidate.create({
                    data : {
                        nomineeId,
                        name
                    }
                }); 

                sendSuccess(
                    res,
                    addedCan,
                    "Data insertion success!"
                );
            }catch(error){
                console.log("Candidates adding error!" , error);
                next(error)
            }
    },
    updatedCandidates : async(
        req : Request <{id:string},object,UpdateCandidatesValidatorInput>,
        res : Response,
        next : NextFunction
    ) : Promise<void> => {
        try{
            const id = req.params.id;
            console.log(id);
            const { nomineeId , name } = req.body;

            if( !id ){
                throw new AppError("Id Not Found!",404);
            };

            const check_id = await prisma.candidate.findUnique({
                where : {id : id},
            });
            
            if(!check_id){
                throw new AppError("${id} candidates not found!" , 400);
            };

            const update_data = await prisma.candidate.update({
                where : {id},
                data : {
                    ...(nomineeId && {nomineeId}),
                    ...(name && {name})
                }
            });

            sendSuccess(
                res,
                update_data,
                `Candidates ${id} updating success `
            );
        }catch(error){
            console.log("Candidates updating Error" , error);
            next(error);
        }
    },
    onlyOneCandidates : async (req :Request<{id : string}>,res:Response,next:NextFunction) => {
        try{
            const id = req.params.id;
         
            if( !id ){
                throw new AppError("Id Not Found!",404);
            };

            const data = await prisma.candidate.findUnique({
                where : {id},
            });

            sendSuccess(
                res,
                data,
                "The data readind success!"
            );
        }catch(error){
            console.log("Candidates updating Error" , error);
            next(error);
        }
    },
    deletedCandidates : async(req : Request<{id : string}> , res : Response , next : NextFunction ) => {
        try{
            const id = req.params.id;
        
            if( !id ){
                throw new AppError("Id Not Found!",404);
            };

            const check_id = await prisma.candidate.findUnique({
                where : {id},
            });

            if(!check_id){
                throw new AppError(`${id} candidates not found!`,404)
            }

            const deletedData = await prisma.candidate.delete({
                where :{ id },
            });

            sendSuccess(
                res,
                deletedData,
                "Data deletion success!"
            )
        }catch(error){
            console.log("Candidates updating Error" , error);
            next(error);
        }
    },

    
}

export default candidatesController