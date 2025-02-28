import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the DiaryEntry model
const DiaryEntry = sequelize.define('DiaryEntry', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Must be a valid date.',
      },
      notEmpty: {
        msg: 'Date is required.',
      },
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title is required.',
      },
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Content is required.',
      },
    },
  },
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
}, {
  tableName: 'diary_entries', // Explicitly set the table name
  timestamps: true, // Enable createdAt and updatedAt fields
});

// Export the DiaryEntry model
export default DiaryEntry;
```

---

### Step 4: Review the Code
1. **Functionality**:
   - The `DiaryEntry` model is defined with the required fields: `date`, `title`, `content`, and `userId`.
   - Each field has appropriate data types and validation rules.
   - The `userId` field is a foreign key referencing the `users` table.
   - The `timestamps` option is enabled to automatically manage `createdAt` and `updatedAt` fields.

2. **Conventions**:
   - The code uses ES6 module syntax (`import`/`export`).
   - The `sequelize` instance is imported from the `backend/config/database.js` file, consistent with the codebase structure.
   - Field names and validation messages are clear and descriptive.

3. **Completeness**:
   - The file is fully functional and does not contain placeholders or TODOs.
   - All required functionality for the `DiaryEntry` model is implemented.

4. **Validation**:
   - The code is valid and runnable.
   - It adheres to the instructions and fulfills the assignment requirements.

---

### Final Output
```
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the DiaryEntry model
const DiaryEntry = sequelize.define('DiaryEntry', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Must be a valid date.',
      },
      notEmpty: {
        msg: 'Date is required.',
      },
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title is required.',
      },
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Content is required.',
      },
    },
  },
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
}, {
  tableName: 'diary_entries', // Explicitly set the table name
  timestamps: true, // Enable createdAt and updatedAt fields
});

// Export the DiaryEntry model
export default DiaryEntry;
