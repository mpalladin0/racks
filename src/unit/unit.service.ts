import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { UnitApplication, UnitApplicationDocument } from './schemas/application.schema';
import { CreateApplicationFormRequest, CreateApplicationFormResponse, CreateIndividualApplicationRequest, Unit } from '@unit-finance/unit-node-sdk'

const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTAxLTE5VDE0OjQyOjE5LjgxNloiLCJqdGkiOiIxMTM5MzgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSIsIm9yZyI6IkJvb20iLCJzb3VyY2VJcCI6IiIsInVzZXJUeXBlIjoib3JnIiwiaXNVbml0UGlsb3QiOmZhbHNlfQOA6c2G-KwN3Xwyzwhjw8O5ReUVFSeoOvb_EsZgDN4-JmrmJ4A5ze4cOXBzgn8gqb1a-50jpt6i8JvRo0whVAc'
const UNIT_API_URL = 'https://api.s.unit.sh/'

@Injectable()
export class UnitService {
    unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

    constructor(
        @InjectModel(UnitApplication.name) private applicationModel: Model<UnitApplicationDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private usersService: UsersService,

    ) {}

    async createApplicationURL(userId: string) {
        const user = await this.userModel.findOne({ "id": userId })
        const { data } = await this.createNewApplication_Unit(user.id)

        console.log(data)


        const application = await new this.applicationModel({
            "user": userId,
            "url": data.attributes.url,
            "unitId": data.id
        }).save()

        await user.updateOne({ "$push": { "applications": application.id }}).exec()

        await application.save()
        await user.save()
        
        return application.save()
    }

    async createNewApplication_Unit(userId: string) {
        let createApplicationFormRequest: CreateApplicationFormRequest = {
            type: 'applicationForm',
            attributes: {
                applicantDetails: {
                    "ssn": "000000002",
                    "fullName": this.unit.helpers.createFullName("Richard", "Hendricks"),
                    "dateOfBirth": "2001-08-10",
                    "address": this.unit.helpers.createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
                    "email": "april@baxter.com",
                    "phone": this.unit.helpers.createPhone("1", "2025550158"),
                    "ein": "123456789",
                    "dba": "Pied Piper Inc",
                },
                tags: {
                    "internal_userId": userId
                }
            },
        }

        let application= this.unit.applicationForms.create(createApplicationFormRequest)
            .catch(err => {
                return err
            })
        return application
    }

    async findApplicationsByUserId(userId: string) {
        return await this.applicationModel.find({ "user": userId }).exec()
    }
}
