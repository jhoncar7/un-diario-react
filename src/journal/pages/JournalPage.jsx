import React from 'react';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views/NothingSelectedView';
import { NoteView } from '../views/NoteView';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';
import { savingNewNote } from '../../store/journal/journalSlice';


export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);

  console.log({ isSaving });

  const onClickNewNote = () => {
    // dispatch(savingNewNote());
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>

      {
        (!!active)
          ? <NoteView />
          : <NothingSelectedView />
      }



      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
