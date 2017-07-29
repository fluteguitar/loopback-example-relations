const app = require('../server/server');

function testJoinQueryLoopback() {
    app.models.Form.create({
	"name": "First Form"
    }).then(result => {
	return app.models.FormQuestion.create({
	    name: "First question",
	    formId: result.id
	});
    }).then (result => {
	return app.models.FormQuestionOption.create({
	    name: "First option",
	    formQuestionId: result.id
	});
    }).then( result => {
	return app.models.FormQuestion.find({
	    include: {"form": "formQuestion"}
	    //{"formQuestion1": "formQuestionOption"} // {
	    // 	"FormQuestion" : "FormQuestion"//: ["FormQuestionOption"]
	    // }
	});
    }).then (result => {
	console.log(result[0]);
    }).catch (err => {
	console.log(err);
    });
}

testJoinQueryLoopback();
