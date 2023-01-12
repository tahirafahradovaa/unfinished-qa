import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    questions: [
      {
        id: 1,
        question: "Was Thanos Right",
        answers: "",
      },
    ],
  },
  reducers: {
    addQuestion: (state, element) => {
      state.questions.push(element);
    },
    addAnswer: (state, element) => {
      state.questions.push(element);
    },
  },
});
export default answerSlice.reducer;
export const { addQuestion, addAnswer } = answerSlice.actions;
