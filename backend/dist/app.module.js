"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const boards_module_1 = require("./modules/boards/boards.module");
const stages_module_1 = require("./modules/stages/stages.module");
const tasks_module_1 = require("./modules/tasks/tasks.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.TYPEORM_TYPE,
                database: process.env.TYPEORM_DATABASE,
                username: process.env.TYPEORM_USERNAME,
                password: process.env.TYPEORM_PASSWORD,
                host: process.env.TYPEORM_HOST,
                port: process.env.TYPEORM_PORT,
                synchronize: true,
                entities: [__dirname + '/**/*.entity.{js,ts}']
            }),
            boards_module_1.BoardsModule,
            stages_module_1.StagesModule,
            tasks_module_1.TasksModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map