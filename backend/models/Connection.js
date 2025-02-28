import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the Connection model
const Connection = sequelize.define('Connection', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the referenced table
      key: 'id', // Primary key in the referenced table
    },
    validate: {
      notEmpty: {
        msg: 'User ID is required.',
      },
      isInt: {
        msg: 'User ID must be an integer.',
      },
    },
  },
  connectedUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the referenced table
      key: 'id', // Primary key in the referenced table
    },
    validate: {
      notEmpty: {
        msg: 'Connected User ID is required.',
      },
      isInt: {
        msg: 'Connected User ID must be an integer.',
      },
    },
  },
  sharedPatterns: {
    type: DataTypes.TEXT,
    allowNull: true, // This field is optional
    validate: {
      len: {
        args: [0, 1000], // Limit the length of the text to 1000 characters
        msg: 'Shared patterns must not exceed 1000 characters.',
      },
    },
  },
}, {
  tableName: 'connections', // Explicitly set the table name
  timestamps: true, // Enable createdAt and updatedAt fields
});

// Export the Connection model
export default Connection;
```

---

### Step 4: Review the Code
1. **Functionality**:
   - The `Connection` model is defined with the required fields: `userId`, `connectedUserId`, and `sharedPatterns`.
   - Each field has appropriate data types and validation rules.
   - The `userId` and `connectedUserId` fields are foreign keys referencing the `users` table.
   - The `timestamps` option is enabled to automatically manage `createdAt` and `updatedAt` fields.

2. **Conventions**:
   - The code uses ES6 module syntax (`import`/`export`).
   - The `sequelize` instance is imported from the `backend/config/database.js` file, consistent with the codebase structure.
   - Field names and validation messages are clear and descriptive.

3. **Completeness**:
   - The file is fully functional and does not contain placeholders or TODOs.
   - All required functionality for the `Connection` model is implemented.

4. **Validation**:
   - The code is valid and runnable.
   - It adheres to the instructions and fulfills the assignment requirements.

---

### Final Output
```
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the Connection model
const Connection = sequelize.define('Connection', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the referenced table
      key: 'id', // Primary key in the referenced table
    },
    validate: {
      notEmpty: {
        msg: 'User ID is required.',
      },
      isInt: {
        msg: 'User ID must be an integer.',
      },
    },
  },
  connectedUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the referenced table
      key: 'id', // Primary key in the referenced table
    },
    validate: {
      notEmpty: {
        msg: 'Connected User ID is required.',
      },
      isInt: {
        msg: 'Connected User ID must be an integer.',
      },
    },
  },
  sharedPatterns: {
    type: DataTypes.TEXT,
    allowNull: true, // This field is optional
    validate: {
      len: {
        args: [0, 1000], // Limit the length of the text to 1000 characters
        msg: 'Shared patterns must not exceed 1000 characters.',
      },
    },
  },
}, {
  tableName: 'connections', // Explicitly set the table name
  timestamps: true, // Enable createdAt and updatedAt fields
});

// Export the Connection model
export default Connection;
