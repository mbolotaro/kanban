import {IsUUID} from 'class-validator'

export class FindBoardDto{
    @IsUUID()
    id: string
}