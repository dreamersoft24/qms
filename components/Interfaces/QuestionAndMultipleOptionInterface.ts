import { multipleOptionInterface } from "./MultipleOptionInterface";

export interface QuestionAndMultipleOptions{
     questionId:number,
    questionText:String,
    questionMarks:number,
    quizzId:number
     multipleOptionList:multipleOptionInterface[];
}