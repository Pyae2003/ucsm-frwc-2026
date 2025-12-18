import { string, z } from "zod";

export const votingSchema = z.object({
    voter : z.string().regex(/^UCSM-[0-9a-fA-F-]{36}$/,"Invalid Voter!"),
    category : z.string().transform((val) => val.toUpperCase()).pipe(z.enum(["THE-WHOLE-KING","THE-WHOLE-QUEEN","KING" ,"QUEEN","PRINCE","PRINCESS","BEST-COUPLE","BEST-SINGER","BEST-PERFORMANCE"])),
    nomineeId : z.string().min(1,"Nominee ID is required"),
})

export const votingCategoriesQuerySchema = z.object({
    category : z.string().transform((val) => val.toUpperCase()).pipe(z.enum(["THE-WHOLE-KING","THE-WHOLE-QUEEN","KING" ,"QUEEN","PRINCE","PRINCESS","BEST-COUPLE","BEST-SINGER","BEST-PERFORMANCE"])).optional(),
});

export type candidatesStatistic = {
    candidateId : string;
    name : string;
    nomineeId : string;
    votes : number;
};



export type votingCategoriesQueryInput = z.infer<typeof votingCategoriesQuerySchema>;
export type votingSchemaInput = z.infer<typeof votingSchema>;