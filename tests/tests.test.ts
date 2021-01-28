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

    it('Show list without a showStatus', function () {
        let validationResult = showsList.validate({
            "title": "New show without any other info!"
        });

        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Show with invalid showStatus', function () {
        let validationResult = showsList.validate({
            "title": "New show without any other info!",
            "showStatus": "somethingWrong"
        });

        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Successfully create show', function () {
        let validationResult = showsList.validate({
            "title": "New show without any other info!",
            "showStatus": ShowStatus.OnSale
        });

        expect(validationResult.result).to.equal(ResultStatus.Success);
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

    it('Unsupported Music Platform', function () {
        let validationResult = musicPlayer.validate({
            'title': 'New song!',
            'musicPlatform': 'Tidal'
        });

        expect(validationResult.result).to.equal(ResultStatus.Failure);
    });

    it('Successfully create a music link', function () {
        let validationResult = musicPlayer.validate({
            'title': 'New song!',
            'musicPlatform': MusicPlatform.Spotify
        });

        expect(validationResult.result).to.equal(ResultStatus.Success);
    })
});