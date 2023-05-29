import { HttpStatus, Injectable } from "@nestjs/common";
import { Plane } from "./plane.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class PlaneService {
    constructor(
        @InjectRepository(Plane)
        private readonly planeRepository: Repository<Plane>
    ) { }

    async create(plane: Plane): Promise<Plane> {

        const newPlane = await this.planeRepository.create(plane);
        newPlane.name = plane.name
        newPlane.seats_amount = plane.seats_amount
        await this.planeRepository.save(newPlane)
        return plane
    }

    findOne(id: number): Promise<Plane> {

        return this.planeRepository.findOne({ where: { id } });

    }

    async findAll(): Promise<Plane[]> {
        return await this.planeRepository.find();
    }

    async update(id: number, updatedPlane: Plane) {
        const plane = await this.planeRepository.findOne({ where: { id } });
        plane.name = updatedPlane.name
        plane.seats_amount = updatedPlane.seats_amount
        await this.planeRepository.save(plane)
        return plane
    }

    remove(id: number) {
        this.planeRepository.delete({ id })
    }




}