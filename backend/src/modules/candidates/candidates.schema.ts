import { z} from "zod"

export const CreateCandidatesValidatorSchema = z.object({
    nomineeId : z.string().min(1,"nomineeId is required"),
    name : z.string().min(1 ,"Name is required").max(120).transform((val) => val.toLowerCase()),
    category : z.string().transform((val) => val.toUpperCase()).pipe(z.enum(["THE-WHOLE-KING","THE-WHOLE-QUEEN","KING" ,"QUEEN","PRINCE","PRINCESS","BEST-COUPLE","BEST-SINGER","BEST-PERFORMANCE"]))

});



export const UpdateCandidatesValidatorSchema = z.object({
    nomineeId : z.string().min(1,"nomineeId is required").optional(),
    name : z.string().min(1 ,"Name is required").max(120).transform((val) => val.toLowerCase()).optional(),
    category : z.string().transform((val) => val.toUpperCase()).pipe(z.enum(["THE-WHOLE-KING","THE-WHOLE-QUEEN","KING" ,"QUEEN","PRINCE","PRINCESS","BEST-COUPLE","BEST-SINGER","BEST-PERFORMANCE"])).optional()

});

export const candidatesIdSchema = z.object({
	id: z.string().uuid("Invalid category ID"),
});

export type CreateCandidatesValidatorInput = z.infer<typeof CreateCandidatesValidatorSchema>;
export type UpdateCandidatesValidatorInput = z.infer<typeof UpdateCandidatesValidatorSchema>;
