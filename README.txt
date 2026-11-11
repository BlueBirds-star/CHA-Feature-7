SchoolDesk features

TEACHER (/teacher)
- Daily Roll Call
- Buttons: Mark all present, Save roll call
- Status words: Present, Absent, Late, Excused

PARENT (/parent)
- Daily attendance: parents see when their child is present or absent
- Send excuse note
- Message: "Your note has been sent to the class teacher."

HOW TO ADD
1. Copy the "app/teacher" and "app/parent" folders into your project's "app" folder.
2. In app/globals.css, add these inside @theme inline:
     --color-navy: #0b1f4b;
     --color-gold: #d4a017;
3. Run "npm run dev" and open /teacher and /parent.

NOTES
- All names and attendance are sample data. Nothing is saved until the database and login are set up.
