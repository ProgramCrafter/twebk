<<<<<<< HEAD
import { salt1, salt2, g, p, srp_id, secure_random, srp_B, password, A, M1, passwordHashed } from '../mock/srp';
=======
import { salt1, salt2, srp_id, password, A, M1, passwordHashed, accountPassword } from '../mock/srp';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import computeSRP, { makePasswordHash } from '../lib/crypto/srp';
import '../lib/polyfill';
import assumeType from '../helpers/assumeType';
import { InputCheckPasswordSRP } from '../layer';

test('2FA hash', async() => {
  const bytes = await makePasswordHash(password, salt1, salt2);
  expect(bytes).toEqual(passwordHashed);
});

test('2FA whole (with negative)', async() => {
<<<<<<< HEAD
  return await computeSRP(password, {
    _: 'account.password',
    current_algo: {
      _: 'passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow',
      salt1, 
      salt2,
      p,
      g
    },
    srp_id,
    srp_B,
    secure_random,
    
    new_algo: null,
    new_secure_algo: null
  }, false).then((res) => {
=======
  return await computeSRP(password, accountPassword, false).then((res) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    assumeType<InputCheckPasswordSRP.inputCheckPasswordSRP>(res);
    
    expect(res.srp_id).toEqual(srp_id);
    expect(res.A).toEqual(A);
    expect(res.M1).toEqual(M1);

    return res;
<<<<<<< HEAD
  }).catch(err => {
=======
  }).catch((err) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    throw err;
  });
});
