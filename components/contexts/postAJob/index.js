import { React, createContext, useState } from 'react';

const PostAJobContext = createContext({
  postAJobform: {
    job: '',
    city: '',
    state: '',
    salary: '',
    benefits: '',
    workType: '',
    description: '',
    hourlyRate: '',
    travel: '',
    jobTitle: '',
    responsibilities: [],
    qualifications: [],
  },
  newForm: () => {},
});

export const PostAJobContextProvider = ({ children }) => {
  const [postAJobform, setPostAJobForm] = useState({});

  const addFormHandler = (form) => {
    setPostAJobForm(form);
  };

  const context = {
    postAJobform: postAJobform,
    newForm: addFormHandler,
  };

  return (
    <PostAJobContext.Provider value={context}>
      {children}
    </PostAJobContext.Provider>
  );
};

export default PostAJobContext;
