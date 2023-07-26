import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const users = [
    signUpUser(firstName, lastName),
    uploadPhoto(fileName),
  ];

  return Promise.allSettled(users).then((values) => {
    const arrayResult = [];
    values.forEach((value) => {
      if (value.status === 'fulfilled') {
        arrayResult.push(value);
      } else {
        arrayResult.push({
          status: value.status,
          value: `Error: ${value.reason.message}`,
        });
      }
    });
    return arrayResult;
  });
}
