const Email = require("../../../domain/valueObjects/email").default;

describe("tests for email",()=>{
    it("should create an email using 'create' method ",()=>{
        const email = Email.create("abc@gmail.com")

        expect(email.emailAddress).toBe("abc@gmail.com")
        expect(email.emailAddress).toContain("@")
        expect(email.emailAddress).toContain(".com")
    })

    it("should create an email using the 'with' method", () => {
        const emailProps = { emailAddress: "abc@gmail.com" };
        const email = Email.with(emailProps);
    
        expect(email.emailAddress).toBe(emailProps.emailAddress);
        expect(email.emailAddress).toContain("@")
        expect(email.emailAddress).toContain(".com")

    });

    it("should format the email correctly", () => {
        const email = Email.create("AbC@GmAiL.cOm");
        expect(email.format()).toBe("abc@gmail.com");
    });
})