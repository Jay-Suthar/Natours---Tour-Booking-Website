const hideAlert1 = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert1 = (type, msg) => {
  hideAlert1();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert1, 5000);
};

const updateSettings1 = async (form) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
      data: form,
    });

    if (res.data.status === 'success') {
      showAlert1('success', 'Data Updated Successfully!');
    }
  } catch (err) {
    showAlert1('error', err.response.data.message);
  }
};

const userDataForm = document.querySelector('.form-user-data');

// if (userDataForm)
//   userDataForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     updateSettings1(name, email);
//   });

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    updateSettings1(form);
  });
// const updateSettings1 = async (data1, type) => {
//   try {
//     const url =
//       type === 'password'
//         ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
//         : 'http://127.0.0.1:3000/api/v1/users/updateMe';

//     const res = await axios({
//       method: 'PATCH',
//       url,
//       data1,
//     });

//     if (res.data.status === 'success') {
//       showAlert1('success', `${type.toUpperCase()} updated successfully!`);
//     }
//   } catch (err) {
//     showAlert1('error', err.response.data.message);
//   }
// };

// if (userDataForm)
//   userDataForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     updateSettings1({ name, email }, 'data');
//   });

const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMyPassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert1('success', 'Password Updated Successfully!');
    }
  } catch (err) {
    showAlert1('error', err.response.data.message);
  }
};

const userPasswordForm = document.querySelector('.form-user-password');

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updatePassword(passwordCurrent, password, passwordConfirm);

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
