import { Permission } from '../../../src/entities/permission.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import {
  UsersPermissions,
  BooksPermissions,
  KeywordsPermissions,
  RolesPermissions,
  PublishersPermissions,
} from './modules';

export default class PermissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = await dataSource.getRepository(Permission);
    // const roleFactory = await factoryManager.get(Role);

    const entities = await repository.create([
      ...UsersPermissions,
      ...BooksPermissions,
      ...KeywordsPermissions,
      ...RolesPermissions,
      ...PublishersPermissions,
    ]);
    await repository.upsert(entities, {
      skipUpdateIfNoValuesChanged: true, // If true, postgres will skip the update if no values would be changed (reduces writes)
      conflictPaths: ['slug'], // column(s) name that you would like to ON CONFLICT
    });
  }
}
