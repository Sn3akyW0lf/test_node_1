const Student = require('../models/student');

exports.getAddStudent = (req, res, next) => {
    res.render('student/add-student', {
        pageTitle: 'Add New Student',
        path: '/add-student'
    });
};


exports.postAddStudent = async (req, res, next) => {
    try {
        console.log(req.body);
        // console.log(req.user);
        const name = req.body.student_name;
        const email = req.body.student_email;
        const phone = req.body.student_phone;
        const parent = req.body.student_parent;
        console.log(name, email, phone, parent);

        const result = await req.user.createStudent({
            name: name,
            email: email,
            ph_student: phone,
            ph_parent: parent
        });

        if (result) {
            console.log('Created Student Successfully');
            res.redirect('/add-student');
        }
    } catch (err) {
        console.log(err);
    }
};