import { Body, Controller, Get, Param, Post, Res, StreamableFile, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor, MulterModule } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { MyVehiclePropertyModel } from 'src/models/my-property/MyProperty';
import { VehicleOwnerModel } from 'src/models/user/UserModel';
import { MyPropertyService } from 'src/service/my-property/my-property.service';

@Controller('my-property')
export class MyPropertyController {
    constructor(private propertyService: MyPropertyService) {

    }

    @Post("vehicle")
    @UseInterceptors(FilesInterceptor('images', 20, {
        storage: diskStorage ({
            destination: "public/images/vehicle",
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`)
            }
        })
    }))
    uploadVehicleProperty(@Body() formBody: VehicleOwnerModel, @UploadedFiles() images: Array<Express.Multer.File>): Promise<ResponseData<[]>> {
        try{
            const pathLists: string [] = [];
            images.map(image => pathLists.push(image.path));

            return this.propertyService.uploadVehicleProperty(formBody, pathLists);
        }
        catch(err) {
            const resp: ResponseData<[]> = {
                code: 0,
                status: 500,
                message: "Someting went wrong.",
                data: []
            };

            return new Promise((resolve, reject) => resolve(resp));
        }
    }
    @Get("vehicles/:email")
    getActiveUserVehicles(@Param("email") email: string): Promise<ResponseData<MyVehiclePropertyModel[]>> {
        return this.propertyService.getActiveUserProperty(email)
    } // get all vehicles of active user
    @Get("vehicle")
    getAllVehicles() {
    } // get all vehicles for assumption display
}
