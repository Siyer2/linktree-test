// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);

// const server = require('../src/index.ts');

// describe('Invalid link type', () => {
//     it('Create school successfully', done => {
//         chai
//             .request(server)
//             .post('/generateLink')
//             .send({
//                 "linkType": 24,
//                 "linkSpecificData": {
//                     "title": "New song!",
//                     "musicPlatform": 1
//                 }
//             })
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//             });
//     });
// });

import { app } from '../src/index';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Hello API Request', () => {
    it('should return response on call', () => {
        return chai.request(app).post('/generateLink')
            .then(res => {
                res.should.have.status(200);
            })
    })
})