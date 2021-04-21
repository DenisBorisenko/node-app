import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1618574446640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" (
              id SERIAL,
              email VARCHAR NOT NULL,
              password VARCHAR NOT NULL
            ) 
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE user');
    }

}
