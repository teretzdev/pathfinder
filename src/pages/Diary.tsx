import React, { useState } from 'react';
import Layout from '../components/Layout';

interface DiaryEntry {
  date: string;
  title: string;
  content: string;
}

const Diary: React.FC = () => {
  const initialState = {
    entries: [] as DiaryEntry[],
    formData: { date: '', title: '', content: '' },
    errors: {} as Partial<DiaryEntry>,
  };

  function diaryReducer(state: typeof initialState, action: any) {
    switch (action.type) {
      case 'SET_FORM_DATA':
        return { ...state, formData: { ...state.formData, [action.payload.name]: action.payload.value } };
      case 'SET_ERRORS':
        return { ...state, errors: action.payload };
      case 'ADD_ENTRY':
        return { ...state, entries: [...state.entries, action.payload], formData: initialState.formData, errors: {} };
      default:
        return state;
    }
  }

  const [state, dispatch] = React.useReducer(diaryReducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FORM_DATA', payload: { name, value } });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DiaryEntry> = {};
    if (!state.formData.date) newErrors.date = 'Date is required.';
    if (!state.formData.title) newErrors.title = 'Title is required.';
    if (!state.formData.content) newErrors.content = 'Content is required.';
    dispatch({ type: 'SET_ERRORS', payload: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch({ type: 'ADD_ENTRY', payload: state.formData });
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Synchronicity Diary</h1>

        {/* Diary Entry Form */}
        <DiaryEntryForm
          formData={state.formData}
          errors={state.errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        {/* Diary Entries List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Your Entries</h2>
          <DiaryEntryList entries={state.entries} />
        </div>
      </div>
    </Layout>
  );
};

export default Diary;