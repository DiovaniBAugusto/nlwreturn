import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


const feedbackUseCase = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('feedback submit', ()=>{
    it('Deve ser capaz de fazer o submit do feedback', async ()=>{
        await expect(feedbackUseCase.execute({
            type: 'BUG',
            comment: 'dando erro aqui',
            screenshot: 'data:image/png;base64,auh2@sdi23uha232uiahui13sd'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('Deve ser capaz de fazer o submit sem passar uma screenshot', async ()=>{
        await expect(feedbackUseCase.execute({
            type: 'BUG',
            comment: 'dando erro aqui',
            screenshot: ''
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('Nao deve ser capaz de fazer o submit sem o type', async ()=>{
        await expect(feedbackUseCase.execute({
            type: '',
            comment: 'dando erro aqui',
            screenshot: 'data:image/png;base64,auh2@sdi23uha232uiahui13sd'
        })).rejects.toThrow();
    })

    it('Nao deve ser capaz de fazer o submit sem o comment', async ()=>{
        await expect(feedbackUseCase.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,auh2@sdi23uha232uiahui13sd'
        })).rejects.toThrow();
    })

    it('Nao deve ser capaz de fazer o submit com uma screenshot no formato invalido', async ()=>{
        await expect(feedbackUseCase.execute({
            type: 'BUG',
            comment: 'dando erro aqui',
            screenshot: 'image.png'
        })).rejects.toThrow();
    })

})