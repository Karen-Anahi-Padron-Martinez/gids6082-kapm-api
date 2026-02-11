import { IsNotEmpty} from "class-validator";

export class CreateTaskDto{
    @IsNotEmpty
    name: string;
    description: string;
    priority: string;

}