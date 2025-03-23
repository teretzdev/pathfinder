export const up = async (queryInterface, Sequelize) => {
  // Create users table
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  // Create diary_entries table
  await queryInterface.createTable('diary_entries', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  // Create connections table
  await queryInterface.createTable('connections', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    connectedUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    sharedPatterns: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  // Add unique constraint to connections
  await queryInterface.addConstraint('connections', {
    fields: ['userId', 'connectedUserId'],
    type: 'unique',
    name: 'unique_connection'
  });

  // Create indexes
  await queryInterface.addIndex('diary_entries', ['userId'], {
    name: 'idx_diary_entries_user_id'
  });
  await queryInterface.addIndex('diary_entries', ['date'], {
    name: 'idx_diary_entries_date'
  });
  await queryInterface.addIndex('connections', ['userId'], {
    name: 'idx_connections_user_id'
  });
  await queryInterface.addIndex('connections', ['connectedUserId'], {
    name: 'idx_connections_connected_user_id'
  });
};

export const down = async (queryInterface, Sequelize) => {
  // Drop tables in reverse order
  await queryInterface.dropTable('connections');
  await queryInterface.dropTable('diary_entries');
  await queryInterface.dropTable('users');
};