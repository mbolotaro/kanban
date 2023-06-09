import { BoardEntity } from "src/modules/boards/boards.entity";
import { StageEntity } from "src/modules/stages/stages.entity";
import { TaskEntity } from "src/modules/tasks/tasks.entity";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common/exceptions";
import messages from "src/helpers/messages";

type acceptedEntities = BoardEntity | StageEntity | TaskEntity

export async function defineOrderAndSave<T extends acceptedEntities>(entity: T, repository: Repository<T>){
    const entitiesList = await repository.find()
    if(typeof entity.order == 'undefined' || entity.order > entitiesList.length + 1){ //se ordem não foi definida
        entity.order = entitiesList.length + 1
    }
    else{ //se ordem foi definida
        const saves: T[] = entitiesList.filter(savedEntity => savedEntity.order >= entity.order)
        saves.forEach(savedEntity => {savedEntity.order = savedEntity.order + 1})
        saves.sort(function(a, b) {
            return b.order - a.order
        })
        
        await repository.save(saves)
    }
    await repository.save(entity)
    
}

export async function updateOrderAndSave<T extends acceptedEntities>(currentOrder: number, newOrder: number, repository: Repository<T>){
    const entitiesList = await repository.find()
    const entityWithCurrentOrder = entitiesList.find(entity => entity.order === currentOrder)
    newOrder = newOrder > entitiesList.length? entitiesList.length: newOrder
    newOrder = newOrder <= 0? 1 : newOrder
    
    
    if(newOrder !== currentOrder){
        //mudando ordem para ordem de transição para que não haja conflitos
        await repository.save(repository.merge(entityWithCurrentOrder, {order: 0} as DeepPartial<T>))

        //valores a serem salvos
        let saves: T[] = []

        if(newOrder > currentOrder){ //caso a nova ordem seja maior que a antiga
            saves = entitiesList.filter(entity => entity.order > currentOrder && entity.order <= newOrder)
            saves.map(entity => entity.order--)
            saves = saves.sort(function(a, b) {
                return a.order - b.order
            })
        }
        else{ //caso a nova ordem seja menor que a antiga
            saves = entitiesList.filter(entity => entity.order < currentOrder && entity.order >= newOrder)
            saves.map(entity => entity.order++)
            saves = saves.sort(function(a, b) {
                return b.order - a.order
            })
        }
        try{
            await repository.save(saves) //salvar mudanças no repositório
            await repository.save(repository.merge(entityWithCurrentOrder, {order: newOrder} as DeepPartial<T>)) //salvar entidade selecionada no repositório
        }
        catch{
            await repository.save(repository.merge(entityWithCurrentOrder, {order: currentOrder} as DeepPartial<T>))
            throw new BadRequestException(messages.badRequest)
        }
    }
    else{
        throw new BadRequestException(messages.sameOrder)
    }
    
}

export async function deleteEntityAndSave<T extends acceptedEntities>(entity: T, repository: Repository<T>){
    const entitiesList = await repository.find()
    const saves: T[] = entitiesList.filter(savedEntity => savedEntity.order > entity.order)
    saves.map(listedEntity => listedEntity.order--)

    saves.sort(function(a, b) {
        return a.order - b.order
    })

    await repository.delete({id: entity.id} as FindOptionsWhere<T>)
    await repository.save(saves)
}