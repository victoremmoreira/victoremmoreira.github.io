// Answer validation system
// This file contains the correct answer references for quiz validation

const answerKey: Record<string, string> = {
  q1: "q1r3",
  q2: "q2r3",
  q3: "q3r3",
  q4: "q4r3",
  q5: "q5r2",
  q6: "q6r2",
  q7: "q7r1",
  q8: "q8r3",
  q9: "q9r3",
  q10: "q10r1",
  q11: "q11r2",
  q12: "q12r2",
  q13: "q13r2",
  q14: "q14r3",
  q15: "q15r2",
  q16: "q16r2",
  q17: "q17r2",
  q18: "q18r2",
  q19: "q19r2",
  q20: "q20r2",
};

export const validateAnswer = (questionTag: string, answerTag: string): boolean => {
  return answerKey[questionTag] === answerTag;
};

export const getCorrectAnswer = (questionTag: string): string => {
  return answerKey[questionTag];
};
