import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let user;
  let photo;

  try {
    user = await createUser();
    photo = await uploadPhoto();
    return {
      user,
      photo,
    };
  } catch (err) {
    return {
      user: null,
      photo: null,
    };
  }
}
