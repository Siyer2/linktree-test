import { expect } from 'chai';
import { Classic } from '../src/linkClasses/Classic';
import { ShowsList, ShowStatus } from '../src/linkClasses/ShowsList';
import { MusicPlayer, MusicPlatform } from '../src/linkClasses/MusicPlayer';
import { ResultStatus } from '../src/utilities/enums';

describe('Validation Middleware for Classic', function () {
    let classicLink = new Classic();
    it('Classic link without a title', function () {
        let validationResult = classicLink.validate({});

        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Classic link with a title > 144', function () {
        let validationResult = classicLink.validate({
            'title': 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello'
        });

        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Successful Classic link', function () {
        let validationResult = classicLink.validate({
            "title": "New thing!"
        });

        expect(validationResult.result).to.equal(ResultStatus.Success);
    });
});

describe('Validation Middleware for ShowList', function () {
    let showsList = new ShowsList();
    it('Show list link without a title', function () {
        let validationResult = showsList.validate({});

        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Show list with a title > 144', function () {
        let validationResult = showsList.validate({
            'title': 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello'
        });

        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Fail creating a shows link without the shows parameter', function () {
        let validationResult = showsList.validate({
            "title": "New post!"
        });

        expect(validationResult.error).to.equal(`A non-empty 'shows' array is a required parameter when creating a Shows link`);
        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });
});

describe('Validation Middleware for MusicPlayer', function () {
    let musicPlayer = new MusicPlayer();
    it('Music player link without a title', function () {
        let validationResult = musicPlayer.validate({});

        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Music player with a title > 144', function () {
        let validationResult = musicPlayer.validate({
            'title': 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello'
        });

        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Creating a music player without the song link parameter', function () {
        let validationResult = musicPlayer.validate({
            'title': 'New song without links!!',
        });

        expect(validationResult.error).to.equal("A non-empty 'songLinks' array is a required parameter when creating a MusicPlayer link");
        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Unsupported music platform', function () {
        let validationResult = musicPlayer.validate({
            "title": "New post!",
            "songLinks": [
                { "platform": 3, "platformLink": "spotify.com/song" }

            ]
        });

        expect(validationResult.error).to.equal('Invalid songLink: {"platform":3,"platformLink":"spotify.com/song"}');
        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Successfully create music link', function () {
        let validationResult = musicPlayer.validate({
            "title": "New song!",
            "songLinks": [
                { "platform": 0, "platformLink": "spotify.com/song" },
                { "platform": 1, "platformLink": "apple.com/song" }
            ]
        });

        expect(validationResult.result).to.equal(ResultStatus.Success);
    });


});