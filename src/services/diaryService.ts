import { get, post, put, del } from './api';

// Define types for diary entries
interface DiaryEntry {
  id: number;
  date: string;
  title: string;
  content: string;
  userId: number;
}

interface CreateDiaryEntryRequest {
  date: string;
  title: string;
  content: string;
  userId: number;
}

interface UpdateDiaryEntryRequest {
  date?: string;
  title?: string;
  content?: string;
}

interface CreateDiaryEntryResponse {
  message: string;
  entry: DiaryEntry;
}

interface UpdateDiaryEntryResponse {
  message: string;
  entry: DiaryEntry;
}

interface DeleteDiaryEntryResponse {
  message: string;
}

// Diary service
const diaryService = {
  /**
   * Fetch all diary entries for a user
   * @param userId - The ID of the user
   * @returns A promise resolving to an array of diary entries
   */
  fetchAllEntries: async (userId: number): Promise<DiaryEntry[]> => {
    return await get<DiaryEntry[]>(`/diary/${userId}`);
  },

  /**
   * Fetch a specific diary entry by ID
   * @param userId - The ID of the user
   * @param entryId - The ID of the diary entry
   * @returns A promise resolving to the diary entry
   */
  fetchEntryById: async (userId: number, entryId: number): Promise<DiaryEntry> => {
    return await get<DiaryEntry>(`/diary/${userId}/${entryId}`);
  },

  /**
   * Create a new diary entry
   * @param data - The data for the new diary entry
   * @returns A promise resolving to the created diary entry
   */
  createEntry: async (data: CreateDiaryEntryRequest): Promise<CreateDiaryEntryResponse> => {
    return await post<CreateDiaryEntryResponse>('/diary', data);
  },

  /**
   * Update an existing diary entry
   * @param userId - The ID of the user
   * @param entryId - The ID of the diary entry
   * @param data - The updated data for the diary entry
   * @returns A promise resolving to the updated diary entry
   */
  updateEntry: async (
    userId: number,
    entryId: number,
    data: UpdateDiaryEntryRequest
  ): Promise<UpdateDiaryEntryResponse> => {
    return await put<UpdateDiaryEntryResponse>(`/diary/${userId}/${entryId}`, data);
  },

  /**
   * Delete a diary entry
   * @param userId - The ID of the user
   * @param entryId - The ID of the diary entry
   * @returns A promise resolving to a success message
   */
  deleteEntry: async (userId: number, entryId: number): Promise<DeleteDiaryEntryResponse> => {
    return await del<DeleteDiaryEntryResponse>(`/diary/${userId}/${entryId}`);
  },
};

export default diaryService;
```

### Step 4: Review the Code
1. **Functionality**:
   - The file implements all CRUD operations for diary entries.
   - Each method uses the appropriate HTTP helper (`get`, `post`, `put`, `del`) from `api.ts`.
   - The methods are asynchronous and return strongly typed promises.
2. **Conventions**:
   - The code uses TypeScript for type safety.
   - The naming conventions and structure align with the existing services in the codebase.
   - The file is modular and exports a single `diaryService` object.
3. **Completeness**:
   - The file is fully functional and does not contain placeholders or TODOs.
   - All required functionality for the diary service is implemented.
4. **Validation**:
   - The code is valid and runnable.
   - It adheres to the instructions and fulfills the assignment requirements.

### Final Output
```
import { get, post, put, del } from './api';

// Define types for diary entries
interface DiaryEntry {
  id: number;
  date: string;
  title: string;
  content: string;
  userId: number;
}

interface CreateDiaryEntryRequest {
  date: string;
  title: string;
  content: string;
  userId: number;
}

interface UpdateDiaryEntryRequest {
  date?: string;
  title?: string;
  content?: string;
}

interface CreateDiaryEntryResponse {
  message: string;
  entry: DiaryEntry;
}

interface UpdateDiaryEntryResponse {
  message: string;
  entry: DiaryEntry;
}

interface DeleteDiaryEntryResponse {
  message: string;
}

// Diary service
const diaryService = {
  /**
   * Fetch all diary entries for a user
   * @param userId - The ID of the user
   * @returns A promise resolving to an array of diary entries
   */
  fetchAllEntries: async (userId: number): Promise<DiaryEntry[]> => {
    return await get<DiaryEntry[]>(`/diary/${userId}`);
  },

  /**
   * Fetch a specific diary entry by ID
   * @param userId - The ID of the user
   * @param entryId - The ID of the diary entry
   * @returns A promise resolving to the diary entry
   */
  fetchEntryById: async (userId: number, entryId: number): Promise<DiaryEntry> => {
    return await get<DiaryEntry>(`/diary/${userId}/${entryId}`);
  },

  /**
   * Create a new diary entry
   * @param data - The data for the new diary entry
   * @returns A promise resolving to the created diary entry
   */
  createEntry: async (data: CreateDiaryEntryRequest): Promise<CreateDiaryEntryResponse> => {
    return await post<CreateDiaryEntryResponse>('/diary', data);
  },

  /**
   * Update an existing diary entry
   * @param userId - The ID of the user
   * @param entryId - The ID of the diary entry
   * @param data - The updated data for the diary entry
   * @returns A promise resolving to the updated diary entry
   */
  updateEntry: async (
    userId: number,
    entryId: number,
    data: UpdateDiaryEntryRequest
  ): Promise<UpdateDiaryEntryResponse> => {
    return await put<UpdateDiaryEntryResponse>(`/diary/${userId}/${entryId}`, data);
  },

  /**
   * Delete a diary entry
   * @param userId - The ID of the user
   * @param entryId - The ID of the diary entry
   * @returns A promise resolving to a success message
   */
  deleteEntry: async (userId: number, entryId: number): Promise<DeleteDiaryEntryResponse> => {
    return await del<DeleteDiaryEntryResponse>(`/diary/${userId}/${entryId}`);
  },
};

export default diaryService;
