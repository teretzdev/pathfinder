import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address.',
      },
      notEmpty: {
        msg: 'Email is required.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password is required.',
      },
    },
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Must be a valid date.',
      },
      notEmpty: {
        msg: 'Date of Birth is required.',
      },
    },
  },
}, {
  tableName: 'users', // Explicitly set the table name
  timestamps: true, // Enable createdAt and updatedAt fields
});

// Export the User model
export default User;
```

---

### Step 4: Review the Code
1. **Functionality**:
   - The `User` model is defined with the required fields: `name`, `email`, `password`, and `dateOfBirth`.
   - Each field has appropriate data types and validation rules.
   - The `email` field is unique to prevent duplicate entries.
   - The `timestamps` option is enabled to automatically manage `createdAt` and `updatedAt` fields.

2. **Conventions**:
   - The code uses ES6 module syntax (`import`/`export`).
   - The `sequelize` instance is imported from the `backend/config/database.js` file, consistent with the codebase structure.
   - Field names and validation messages are clear and descriptive.

3. **Completeness**:
   - The file is fully functional and does not contain placeholders or TODOs.
   - All required functionality for the User model is implemented.

4. **Validation**:
   - The code is valid and runnable.
   - It adheres to the instructions and fulfills the assignment requirements.

---

### Final Output
```
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address.',
      },
      notEmpty: {
        msg: 'Email is required.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password is required.',
      },
    },
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Must be a valid date.',
      },
      notEmpty: {
        msg: 'Date of Birth is required.',
      },
    },
  },
}, {
  tableName: 'users', // Explicitly set the table name
  timestamps: true, // Enable createdAt and updatedAt fields
});

// Export the User model
export default User;
