import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgresql://neondb_owner:npg_VUoArT49ZSDk@ep-silent-river-a1if9gjk-pooler.ap-southeast-1.aws.neon.tech/content_broadcast?sslmode=require&channel_binding=require",
  {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);
export { sequelize };
