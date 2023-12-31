import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "./firebaseconfig";
import { KanjiGrades, downGrade, upGrade } from "../utility/types";
import { KanjiData } from "../logic/ReadJson";
import { calculateNextReviewDate } from "../utility/utility";

//The database looks like this:
// -users
//  --> userId
//      --> LevelNumber
//            --> KanjiCharacter
//                  --> reviewTime
//                  --> kanjiGrade
// and:
// -kanjis
//  --> character
//      -> meanigns
//      -> readings_on
//      -> etc...
class DatabaseService {
    private readonly database;

    constructor() {
        this.database = getDatabase(app);
    }

    async saveUserData(userId: string, data: any) {
        const userRef = ref(this.database, `users/${userId}`);
        await set(userRef, data);
    }

    async getUserData(userId: string) {
        const userRef = ref(this.database, `users/${userId}`);
        const snapshot = await get(userRef);
        return snapshot.val();
    }

    async saveUserLevelProgess(userId: string, level: number, kanjis: KanjiData[], reviewTimes: number[], grades: KanjiGrades[]) {
        kanjis.forEach( async (kanji, index) => {
            const userRef = ref(this.database, `users/${userId}/${level}/${kanji.character}`);
            await set(userRef, { reviewTime: reviewTimes[index], kanjiGrade: grades[index] })
                .catch((error) => {
                    console.log('Error while saving User Level Progress');
                });
        });
    }
    
    async getUserLevelProgress(userId: string, level: number) {
        return new Promise<any>(async (resolve, reject) => {
            const userRef = ref(this.database, `users/${userId}/${level}`);
            try {
                const snapshot = await get(userRef);
    
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                } else {
                    resolve(null);
                }
            } catch (error) {
                reject('Error while retrieving Data.');
            }
        });
    }

    async saveUserKanjiReviewTime(userId: string, level: number, kanji: string, nextReviewTime: number) {
        const userRef = ref(this.database, `users/${userId}/${level}/${kanji}`);

        await set(userRef, { nextReviewTime: nextReviewTime })
            .catch((error) => {
                console.log('Error while saving Kanji Review Date');
            });
    }

    async getUserKanjiReviewTime(userId: string, level: number, kanji: string) {
        return new Promise<number>(async (resolve, reject) => {
            const userRef = ref(this.database, `users/${userId}/${level}/${kanji}/nextReviewTime`);
            try {
                const snapshot = await get(userRef);
    
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                } else {
                    reject('Review Time for the user could not be found.');
                }
            } catch (error) {
                reject('Error while retrieving Data.');
            }
        });
    }

    /**
     * Saves the grade for the given Kanji. 
     * @param up true for upgrade, false for downgrade, undefined for neither
     */
    async saveUserKanjiGrade(userId: string, level: number, kanji: string, grade: KanjiGrades, up?: boolean) {
        const userRef = ref(this.database, `users/${userId}/${level}/${kanji}`);

        await set(userRef, { kanjiGrade: up ? upGrade(grade) : (up === false ? downGrade(grade) : grade) })
            .catch((error) => {
                console.log('Error while saving Kanji Grade');
            });
    }

    async getUserKanjiGrade(userId: string, level: number, kanji: string) {
        return new Promise<number>(async (resolve, reject) => {
            const userRef = ref(this.database, `users/${userId}/${level}/${kanji}/kanjiGrade`);
            try {
                const snapshot = await get(userRef);
    
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                } else {
                    reject('Kanji Grade for the user could not be found.');
                }
            } catch (error) {
                reject('Error while retrieving Data.');
            }
        });
    }

    async getKanjiData(kanji: string) {
        return new Promise<KanjiData>(async (resolve, reject) => {
            const kanjiRef = ref(this.database, `kanjis/${kanji}/`);
            try {
                const snapshot = await get(kanjiRef);
    
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                } else {
                    reject('Kanji could not be found.');
                }
            } catch (error) {
                reject('Error while retrieving Data.');
            }
        });
    }

    async addMockData(userId: string, level: number, kanjis: KanjiData[]) {
        return new Promise<number>(async () => {
            kanjis.forEach( async (kanji, index) => {
                const userRef = ref(this.database, `users/${userId}/${level}/${kanji.character}`);
                await set(userRef, { kanjiGrade: index % 2 === 0 ? KanjiGrades.Friendly : KanjiGrades.Colleague, reviewTime: calculateNextReviewDate(index + 12) })
                    .catch((error) => {
                        console.log('Error while saving Kanji Grade');
                    });
            });
        });
    }

    async addKanjiData(kanjis: KanjiData[]) {
        return new Promise<number>(async () => {
            kanjis.forEach( async (kanji) => {
                const userRef = ref(this.database, `kanjis/${kanji.character}/`);
                await set(userRef, 
                    { 
                        character: kanji.character,
                        strokes: kanji.strokes, 
                        grade: kanji.grade, 
                        freq: kanji.freq, 
                        jlpt_old: kanji.jlpt_old, 
                        jlpt_new: kanji.jlpt_new, 
                        meanings: kanji.meanings, 
                        readings_on: kanji.readings_on, 
                        readings_kun: kanji.readings_kun,
                        wk_level: kanji.wk_level, 
                        wk_meanings: kanji.wk_meanings, 
                        wk_readings_on: kanji.wk_readings_on, 
                        wk_readings_kun: kanji.wk_readings_kun, 
                        wk_radicals: kanji.wk_radicals
                    })
                    .catch((error) => {
                        console.log('Error while saving Kanji Grade');
                    });
            });
        });
    }
    
}

export default new DatabaseService();