import { Entity } from "../../core/entitites/entity";

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {

}