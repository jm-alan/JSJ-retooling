const fs = require('fs');
const fsProm = fs.promises;
const readline = require('readline');
const faker = require('faker');
const bcrypt = require('bcrypt');
const { once } = require('events');

const userMaker = async () => {
  for (let i = 1; i <= 5000; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const pNum = Math.floor(Math.random() * 9999);
    const email = `${firstName}_${lastName}${pNum}@gmail.com`;
    const userName = `${firstName.toLowerCase()}${lastName}${pNum}`;
    const plaintextPass = faker.internet.password();
    const hashedPass = await bcrypt.hash(plaintextPass, 10);
    const userObj = {
      userName,
      hashedPass,
      email,
      firstName,
      lastName
    };
    const badPassObj = {
      userName,
      plaintextPass
    };
    console.log('Writing user', userName, 'to seed file!');
    await fsProm.appendFile(`./users/userObjsPage${Math.floor(i / 100 + 1)}.txt`, JSON.stringify(userObj) + '\n', 'utf-8');
    await fsProm.appendFile(`./users/badPassStoragePage${Math.floor(i / 100 + 1)}.txt`, JSON.stringify(badPassObj) + '\n', 'utf-8');
  }
};

const passTester = async () => {
  for (let i = 1; i <= 50; i++) {
    const passStream = fs.createReadStream(`./users/badPassStoragePage${i}.txt`);
    const hashStream = fs.createReadStream(`./users/userObjsPage${i}.txt`);
    const passReader = readline.createInterface({
      input: passStream,
      crlfDelay: Infinity
    });
    const hashReader = readline.createInterface({
      input: hashStream,
      crlfDelay: Infinity
    });

    const passArray = [];
    const hashArray = [];

    passReader.on('line', line => {
      passArray.push(JSON.parse(line));
    });

    hashReader.on('line', line => {
      hashArray.push(JSON.parse(line));
    });

    await once(passReader, 'close');
    await once(hashReader, 'close');

    passArray.forEach(({ userName, plaintextPass }, idx) => {
      if (!bcrypt.compareSync(plaintextPass, hashArray[idx].hashedPass)) {
        console.log('Oh no, hash mismatch! Username mismatch?');
        console.log('Plaintext user:', userName, 'Hash user:', hashArray[idx].userName);
      }
    });
  }
  console.log('Checked 5000 pass/hash combinations.');
};
