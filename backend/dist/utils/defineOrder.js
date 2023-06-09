"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntityAndSave = exports.updateOrderAndSave = exports.defineOrderAndSave = void 0;
const exceptions_1 = require("@nestjs/common/exceptions");
const messages_1 = require("../helpers/messages");
async function defineOrderAndSave(entity, repository) {
    const entitiesList = await repository.find();
    if (typeof entity.order == 'undefined' || entity.order > entitiesList.length + 1) {
        entity.order = entitiesList.length + 1;
    }
    else {
        const saves = entitiesList.filter(savedEntity => savedEntity.order >= entity.order);
        saves.forEach(savedEntity => { savedEntity.order = savedEntity.order + 1; });
        saves.sort(function (a, b) {
            return b.order - a.order;
        });
        await repository.save(saves);
    }
    return await repository.save(entity);
}
exports.defineOrderAndSave = defineOrderAndSave;
async function updateOrderAndSave(currentOrder, newOrder, repository) {
    const entitiesList = await repository.find();
    const entityWithCurrentOrder = entitiesList.find(entity => entity.order === currentOrder);
    newOrder = newOrder > entitiesList.length ? entitiesList.length : newOrder;
    newOrder = newOrder <= 0 ? 1 : newOrder;
    if (newOrder !== currentOrder) {
        await repository.save(repository.merge(entityWithCurrentOrder, { order: 0 }));
        let saves = [];
        if (newOrder > currentOrder) {
            saves = entitiesList.filter(entity => entity.order > currentOrder && entity.order <= newOrder);
            saves.map(entity => entity.order--);
            saves = saves.sort(function (a, b) {
                return a.order - b.order;
            });
        }
        else {
            saves = entitiesList.filter(entity => entity.order < currentOrder && entity.order >= newOrder);
            saves.map(entity => entity.order++);
            saves = saves.sort(function (a, b) {
                return b.order - a.order;
            });
        }
        try {
            await repository.save(saves);
            return await repository.save(repository.merge(entityWithCurrentOrder, { order: newOrder }));
        }
        catch (_a) {
            await repository.save(repository.merge(entityWithCurrentOrder, { order: currentOrder }));
            throw new exceptions_1.BadRequestException(messages_1.default.badRequest);
        }
    }
    else {
        throw new exceptions_1.BadRequestException(messages_1.default.sameOrder);
    }
}
exports.updateOrderAndSave = updateOrderAndSave;
async function deleteEntityAndSave(entity, repository) {
    const entitiesList = await repository.find();
    const saves = entitiesList.filter(savedEntity => savedEntity.order > entity.order);
    saves.map(listedEntity => listedEntity.order--);
    saves.sort(function (a, b) {
        return a.order - b.order;
    });
    await repository.delete({ id: entity.id });
    await repository.save(saves);
}
exports.deleteEntityAndSave = deleteEntityAndSave;
//# sourceMappingURL=defineOrder.js.map