// js/app.js - FINAL COMBINED VERSION
console.log('🚀 Loading Maharaja College System...');

// ==================== DATAHANDLER.JS ====================
class DataHandler {
    static init() {
        console.log('🔧 Initializing data...');
        
        const defaults = {
            'school_users': [
                {
                    id: '1',
                    name: 'Rahul Sharma',
                    email: 'rahul@maharajacollege.ac.in',
                    password: 'hashed_password',
                    type: 'student',
                    rollNumber: 'BCA23001',
                    semester: '3',
                    course: 'BCA',
                    phone: '9876543210',
                    dob: '2002-05-15',
                    joinDate: '2023-07-01'
                },
                {
                    id: '2',
                    name: 'Dr. Sunita Verma',
                    email: 'sunita@maharajacollege.ac.in',
                    password: 'hashed_password',
                    type: 'teacher',
                    department: 'Computer Science',
                    designation: 'Assistant Professor',
                    phone: '9876543200',
                    dob: '1975-08-15',
                    joinDate: '2020-06-15'
                },
                {
                    id: '3',
                    name: 'Admin User',
                    email: 'admin@maharajacollege.ac.in',
                    password: 'hashed_password',
                    type: 'admin',
                    joinDate: '2020-01-01'
                },
                {
                    id: '4',
                    name: 'Demo Student',
                    email: 'demo@maharajacollege.ac.in',
                    password: 'hashed_password',
                    type: 'student',
                    rollNumber: 'BCA23000',
                    semester: '3',
                    course: 'BCA',
                    dob: '2000-01-01',
                    joinDate: '2023-07-01'
                }
            ],
            'school_student_profiles': [],
            'school_classes': [
                {
                    id: '1',
                    name: 'BCA Semester 3',
                    course: 'BCA',
                    semester: '3',
                    classTeacher: '2',
                    capacity: 60,
                    subjects: ['Java Programming', 'DBMS', 'Data Structures', 'Operating Systems']
                }
            ],
            'school_timetable': [],
            'school_attendance': [],
            'school_grades': [],
            'school_fee_management': [],
            'school_materials': [],
            'school_tests': [],
            'school_submissions': [],
            'school_notices': [],
            'school_messages': [],
            'school_activities': []
        };

        for (const [key, value] of Object.entries(defaults)) {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify(value));
                console.log(`✅ Created ${key} with ${value.length} items`);
            }
        }

        console.log('🎉 Data initialization complete');
    }

    // ==================== GETTER METHODS ====================
    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
    }

    static setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    static getUsers() {
        return JSON.parse(localStorage.getItem('school_users') || '[]');
    }

    static getStudentProfiles() {
        return JSON.parse(localStorage.getItem('school_student_profiles') || '[]');
    }

    static getClasses() {
        return JSON.parse(localStorage.getItem('school_classes') || '[]');
    }

    static getTimetable() {
        return JSON.parse(localStorage.getItem('school_timetable') || '[]');
    }

    static getAttendance() {
        return JSON.parse(localStorage.getItem('school_attendance') || '[]');
    }

    static getGrades() {
        return JSON.parse(localStorage.getItem('school_grades') || '[]');
    }

    static getFeeRecords() {
        return JSON.parse(localStorage.getItem('school_fee_management') || '[]');
    }

    static getMaterials() {
        return JSON.parse(localStorage.getItem('school_materials') || '[]');
    }

    static getTests() {
        return JSON.parse(localStorage.getItem('school_tests') || '[]');
    }

    static getSubmissions() {
        return JSON.parse(localStorage.getItem('school_submissions') || '[]');
    }

    static getNotices() {
        return JSON.parse(localStorage.getItem('school_notices') || '[]');
    }

    static getMessages() {
        return JSON.parse(localStorage.getItem('school_messages') || '[]');
    }

    static getActivities() {
        return JSON.parse(localStorage.getItem('school_activities') || '[]');
    }

    // ==================== ADD/CREATE METHODS ====================
    static addUser(user) {
        const users = this.getUsers();
        users.push(user);
        this.saveToStorage('school_users', users);
        return user;
    }

    static createUser(userData) {
        const users = this.getUsers();
        
        // Check if user already exists
        const existingUser = users.find(u => 
            u.email === userData.email || 
            (u.type === 'student' && u.rollNumber === userData.rollNumber)
        );
        
        if (existingUser) {
            throw new Error('User already exists with this email or roll number');
        }
        
        // Add required fields
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            joinDate: new Date().toISOString().split('T')[0],
            password: 'hashed_password'
        };
        
        users.push(newUser);
        this.saveToStorage('school_users', users);
        console.log('👤 User created:', newUser.name);
        return newUser;
    }

    static addStudentProfile(profile) {
        const profiles = this.getStudentProfiles();
        profiles.push(profile);
        this.saveToStorage('school_student_profiles', profiles);
        return profile;
    }

    static addMaterial(material) {
        const materials = this.getMaterials();
        materials.push(material);
        this.saveToStorage('school_materials', materials);
        return material;
    }

    static addNotice(notice) {
        const notices = this.getNotices();
        notices.push(notice);
        this.saveToStorage('school_notices', notices);
        return notice;
    }

    static addTest(test) {
        const tests = this.getTests();
        tests.push(test);
        this.saveToStorage('school_tests', tests);
        return test;
    }

    static addSubmission(submission) {
        const submissions = this.getSubmissions();
        submissions.push(submission);
        this.saveToStorage('school_submissions', submissions);
        return submission;
    }

    static addMessage(message) {
        const messages = this.getMessages();
        messages.push(message);
        this.saveToStorage('school_messages', messages);
        console.log('💬 Message added:', message.content);
        return message;
    }

    static addActivity(activity) {
        const activities = this.getActivities();
        activities.push(activity);
        this.saveToStorage('school_activities', activities);
        return activity;
    }

    static markAttendance(attendance) {
        const records = this.getAttendance();
        const filtered = records.filter(record => 
            !(record.studentId === attendance.studentId && record.date === attendance.date)
        );
        filtered.push(attendance);
        this.saveToStorage('school_attendance', filtered);
        return attendance;
    }

    static addGrade(grade) {
        const grades = this.getGrades();
        grades.push(grade);
        this.saveToStorage('school_grades', grades);
        return grade;
    }

    static addFeeRecord(record) {
        const records = this.getFeeRecords();
        records.push(record);
        this.saveToStorage('school_fee_management', records);
        return record;
    }

    // ==================== UPDATE METHODS ====================
    static updateUser(userId, updates) {
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        
        // Prevent modifying demo users
        const demoUsers = ['Rahul Sharma', 'Dr. Sunita Verma', 'Admin User', 'Demo Student'];
        if (demoUsers.includes(users[userIndex].name)) {
            throw new Error('Cannot modify demo accounts');
        }
        
        users[userIndex] = { ...users[userIndex], ...updates };
        this.saveToStorage('school_users', users);
        return users[userIndex];
    }

    static updateFeePayment(recordId, paymentData) {
        const records = this.getFeeRecords();
        const index = records.findIndex(r => r.id === recordId);
        
        if (index !== -1) {
            if (!records[index].payments) {
                records[index].payments = [];
            }
            
            records[index].payments.push(paymentData);
            records[index].paidAmount = (records[index].paidAmount || 0) + paymentData.amount;
            records[index].balance = records[index].totalAmount - records[index].paidAmount;
            records[index].status = records[index].balance === 0 ? 'Paid' : 
                                  records[index].paidAmount > 0 ? 'Partial' : 'Pending';
            
            this.saveToStorage('school_fee_management', records);
            return records[index];
        }
        return null;
    }

    // ==================== DELETE METHODS ====================
    static deleteUser(userId) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        // Prevent deleting demo users
        const demoUsers = ['Rahul Sharma', 'Dr. Sunita Verma', 'Admin User', 'Demo Student'];
        if (demoUsers.includes(user.name)) {
            throw new Error('Cannot delete demo accounts');
        }
        
        const filteredUsers = users.filter(u => u.id !== userId);
        this.saveToStorage('school_users', filteredUsers);
        console.log('🗑️ User deleted:', user.name);
        return true;
    }

    // ==================== UTILITY METHODS ====================
    static saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static logout() {
        localStorage.removeItem('currentUser');
    }

    static userExists(email) {
        const users = this.getUsers();
        return users.some(user => user.email === email);
    }

    static exportData(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ==================== DEMO ACCOUNT PROTECTION ====================
    static isDemoUser(userId) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        const demoUsers = ['Rahul Sharma', 'Dr. Sunita Verma', 'Admin User', 'Demo Student'];
        return user ? demoUsers.includes(user.name) : false;
    }

    static getDemoUsers() {
        const users = this.getUsers();
        const demoUsers = ['Rahul Sharma', 'Dr. Sunita Verma', 'Admin User', 'Demo Student'];
        return users.filter(u => demoUsers.includes(u.name));
    }

    // ==================== DEBUG METHODS ====================
    static debugData() {
        console.log('=== DATA DEBUG INFO ===');
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                console.log(`${key}:`, Array.isArray(data) ? `${data.length} items` : data);
            } catch (e) {
                console.log(`${key}:`, localStorage.getItem(key));
            }
        });
        console.log('=== END DEBUG INFO ===');
        alert('Check browser console for debug info!');
    }

    static importUserData(jsonData) {
        const users = this.getUsers();
        const importedUsers = jsonData.map(student => ({
            id: Date.now().toString() + Math.random(),
            name: student.name,
            email: student.email || `${student.rollNumber?.toLowerCase()}@maharajacollege.ac.in`,
            password: 'hashed_default_password',
            type: 'student',
            rollNumber: student.rollNumber,
            semester: student.semester || '3',
            course: student.course || 'BCA',
            phone: student.phone,
            dob: student.dob,
            joinDate: new Date().toISOString().split('T')[0]
        }));
        
        users.push(...importedUsers);
        this.saveToStorage('school_users', users);
        return importedUsers;
    }
}

// ==================== AUTH.JS ====================
class Auth {
    static login(email, password, userType) {
        const users = DataHandler.getUsers();
        
        // Clean the input
        const cleanEmail = email.trim().toLowerCase();
        
        // Find user by name or email (case insensitive, flexible matching)
        const user = users.find(u => {
            const cleanUserName = u.name.trim().toLowerCase();
            const cleanUserEmail = u.email ? u.email.trim().toLowerCase() : '';
            const typeMatch = u.type === userType;
            
            const nameMatch = cleanUserName === cleanEmail;
            const emailMatch = cleanUserEmail === cleanEmail;
            const partialMatch = cleanUserName.includes(cleanEmail) || cleanEmail.includes(cleanUserName);
            
            return (nameMatch || emailMatch || partialMatch) && typeMatch;
        });

        if (!user) {
            const availableUsers = users.filter(u => u.type === userType).map(u => u.name);
            throw new Error(`User "${email}" not found as ${userType}. Available ${userType}s: ${availableUsers.join(', ') || 'None'}`);
        }

        // Password validation
        let passwordValid = false;
        
        if (user.type === 'admin') {
            passwordValid = password === '123456';
            if (!passwordValid) {
                throw new Error('Invalid admin password. Use: 123456');
            }
        } else {
            if (user.dob) {
                const dobPassword1 = user.dob.replace(/-/g, '');
                const dobPassword2 = user.dob.split('-').reverse().join('');
                passwordValid = password === dobPassword1 || password === dobPassword2;
            }
            
            if (!passwordValid) {
                passwordValid = password === '123456';
            }
            
            if (!passwordValid) {
                throw new Error(`Invalid password. Try: DOB (${user.dob ? user.dob.replace(/-/g, '') : 'N/A'}) or default password: 123456`);
            }
        }

        return user;
    }

    static simpleLogin(name, userType) {
        const users = DataHandler.getUsers();
        const cleanName = name.trim().toLowerCase();
        
        const user = users.find(u => 
            u.name.trim().toLowerCase() === cleanName && 
            u.type === userType
        );
        
        if (!user) {
            throw new Error(`User "${name}" not found as ${userType}`);
        }
        
        return user;
    }
}

// ==================== INITIALIZATION ====================
console.log('🎯 Initializing Maharaja College System...');
DataHandler.init();
console.log('✅ System ready!');

// Make classes globally available
window.DataHandler = DataHandler;
window.Auth = Auth;
