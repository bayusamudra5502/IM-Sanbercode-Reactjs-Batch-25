export const transformDataForServer = ({ nama, mataKuliah, nilai }) => ({
  name: nama,
  course: mataKuliah,
  score: nilai,
});

export const transforDataFromServer = ({ name, course, score }) => ({
  nama: name,
  mataKuliah: course,
  nilai: score,
});
