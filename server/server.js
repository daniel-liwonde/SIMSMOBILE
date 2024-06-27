const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const port = 3000;
const dbConfig = {
    host: 'localhost',
    user: 'abc123',
    password: '(!v7[XrawMxqbwzT',
    database: 'sims',
};
app.use(cors());
app.use(bodyParser.json());
// GET request to fetch all users
app.post('/feesdata', async (req, res) => {
    try {
      const {studid}= req.body;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM student_fees WHERE id=? ORDER BY year DESC',[studid]);
        connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Error', error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});

app.post('/getprevresults/:studid', async (req, res) => {
  //req.headers('Access-Control-Allow-Origin', '*');
  try {
    const sID = req.params.studid;
    console.log('prv',sID);

      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM results INNER JOIN subject on results.course_code=subject.subject_code WHERE results.uid=? ORDER BY results.year DESC',[sID]);
      connection.end();
      res.json(rows);
  } catch (error) {
      console.error('Error', error.message);
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});
  // Endpoint to handle login
  
// GET request to fetch all users
app.get('/semdata', async (req, res) => {
  //req.headers('Access-Control-Allow-Origin', '*');
  try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM sems');
      connection.end();
      res.json({detail:rows});
  } catch (error) {
      console.error('Error connecting to MySQL:', error.message);
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});
//start registered courses
app.post('/regCourses', async (req, res) => {
  try {
    const { cy,tsem,id} = req.body; 
    console.log('the data'+ cy,tsem,id);
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM teacher_student INNER JOIN subject ON teacher_student.subject_id=subject.subject_id LEFT JOIN teacher ON teacher_student.teacher_id=teacher.teacher_id WHERE teacher_student.uid=? and  teacher_student.year=? and  teacher_student.semester=?',[id,cy,tsem]);
      if (rows.length === 0) {
        res.status(404).json({ nodata: true });
      }
      else
      {
        res.json(rows);
        connection.end();
      }
  } catch (error) {
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
      console.error('Error connecting to MySQL:', error.message);
  }
});
//end registered courses
  app.get('/courses', async (req, res) => {
    //req.headers('Access-Control-Allow-Origin', '*');
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM subject INNER JOIN teacher ON subject.teacher_id = teacher.teacher_id');
        connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});
 // Endpoint to handle login
 app.post('/registerCourse', async(req, res)=> {
try {
 const connection = await mysql.createConnection(dbConfig);
 const{subID, tID, sID,cYear,csem,coTITLE,uid,cCODE} = req.body;

 const [dupCourse] = await connection.execute('select * from teacher_student where uid=? and semester=? and year=? and subject_id=?',[sID,csem,cYear,subID]);
 const [number_query] = await connection.execute('select * from teacher_student where uid=? and semester=? and year=?',[sID,csem,cYear]);
 const [feesdata] = await connection.execute('select * from student_fees where  id=? and sem=? and year=? and amount_paid!=?',[sID,csem,cYear,0]);
 const [numCo] = await connection.execute("select * from maxcourse_no");
 const {max_No}= numCo[0];

 if(number_query.length >= max_No)
 {
  res.status(404).json({error: 'Sorry you have reached maxmum number of courses per semester' });
 
 }
 else if(dupCourse.length > 0)
 {
  res.status(404).json({error:`Sorry you have already registered this course${coTITLE}` });
  console.log('Sorry you have already registered the course');
 }
 else if(feesdata.length ===0)
  {
  res.status(404).json({error: 'Sorry you have have to pay atleast one installment to register courses' });
  //console.log(amount_paid);
  }
  else
  {
 await connection.execute('INSERT INTO teacher_student (teacher_id,uid,subject_id,year,semester) VALUES(?,?,?,?,?)',[tID,sID,subID,cYear,csem]); 
 await connection.execute('INSERT INTO moodle_courses(coursecode,studentid,coursename,course_year,course_sem) VALUES(?,?,?,?,?)',[cCODE,uid,coTITLE,cYear,csem]) 
 res.status(200).json({success: `Successifully added ${coTITLE}`});
  }
} catch (error) {
  res.status(500).json({ success: false, message: `Internal Server Error${error}` });
}
 }
 );
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if(username === undefined || password===undefined) {

    res.status(401).json({success: false, message:"Please provide values for username and password"});
  } else {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const hashpass = crypto.createHash("md5").update(password).digest("hex");
    // Check if username and password exist in the 'teacher' table
    const [rows] = await connection.execute('SELECT * FROM student WHERE username = ? AND password = ?', [username, hashpass]);

    if (rows.length !== 0) {
      res.status(200).json({ success: true, detail: rows });
    } else {
      res.status(404).json({ success: false, message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error occoured! ${error}` });
  }
}
});
//start carryover thread

app.post('/overs', async (req, res) => {
  
  try {
    const{csem,cYear,studid}=req.body;
    console.log('carryover details:',csem,cYear,studid);
    const connection = await mysql.createConnection(dbConfig);
    // Check if username and password exist in the 'teacher' table
    const [rows] = await connection.execute('SELECT * FROM teacher_student INNER JOIN subject ON teacher_student.subject_id=subject.subject_id  WHERE teacher_student.uid=? and  teacher_student.year=? and  teacher_student.semester=? and teacher_student.being_repeated=?',[studid,cYear,csem,1]);
    if (rows.length === 0) {
      res.status(404).json({ nodata: true });
    }
    else
    {
      res.json(rows);
      connection.end();
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `Internal Server Error ${error}` });
  }

});

//end carryover thread
//start carryover thread
app.post('/cresults', async (req, res) => {
  
  try {
    const {sSEM,sYear,sID} = req.body;
    const connection = await mysql.createConnection(dbConfig);
    var sem;
    var year;
    if(sSEM===1) {sem=2;year=sYear-1} else {sem=1;year=sYear}
    console.log(year,sem);
    // Check if username and password exist in the 'teacher' table
    const [rows] = await connection.execute('SELECT * FROM results LEFT JOIN subject ON results.course_code=subject.subject_code WHERE results.uid =? and results.year=? and results.sem=?',[996733917,2023,2]);
    if (rows.length !== 0) {
      res.status(200).json({ success: true, theData: rows });
    } else {
      res.status(404).json({ success: false, message: `Current results not found, Year:${year}, Sem:${sem},${sID}`});
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `Internal Server Error:${error.message}` });
  }

});

//end carryover thread


//start Register
app.post('/register', async(req, res) => {
  try{
  const{fname,lname,email,username} = req.body;
  const conn= await mysql.createConnection(dbConfig);
  await conn.execute('INSERT INTO teacher(firstname,lastname,email,username) VALUES(?,?,?,?)',[fname,lname,email,username]);
  res.json({message: 'successfully registered'});
  console.log('successfully registered');
  }catch(e){
    res.json({message:`Error has occurred ${e.message}`});
    res.status(500).json({ success: false, message: 'Internal Server Error' }); 
  }

});
//end of register
//start delete course

// DELETE request to delete a user by ID
app.delete('/deletecourse', async (req, res) => {
  try {
    const {coId,stID,coYear,coSem,uid,subCODE}= req.body;
      const connection = await mysql.createConnection(dbConfig);
          // Delete the user with the given ID
          console.log(coId,stID,coYear,coSem,uid,subCODE)
          await connection.execute('DELETE FROM teacher_student WHERE subject_id= ? and uid=? and year=? and semester=?', [coId,stID,coYear,coSem]);
          await connection.execute('DELETE FROM moodle_courses WHERE studentid=? and coursecode=? and course_year= ? and course_sem=?',[uid,subCODE,coYear,coSem]);
          res.json({ message: `${subCODE} deleted successfully`});
      connection.end();
  } catch (error) {
    console.log(error);
      console.error('Error connecting to MySQL:', error.message);
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});
//end delete course

// DELETE request to delete a user by ID
app.delete('/api/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL');
        // Check if the user with the given ID exists
        const [user] = await connection.execute('SELECT * FROM teacher WHERE teacher_id = ?', [userId]);
        if (user.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            // Delete the user with the given ID
            await connection.execute('DELETE FROM teacher WHERE teacher_id = ?', [userId]);
            res.json({ message: 'User deleted successfully' });
        }
        connection.end();
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is - http://127.0.0.1:${PORT}`);
});
