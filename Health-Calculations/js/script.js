//Об'єкт має набір методів з формулами, до розрахунку необхідних значень
calculations = {

    /*__________ Об'єкти констант для наступних методів __________*/ 

    //Об'єкт констант, що використовуються у методах/формулах
    constants: {

        //Об'єкт констант категорій порогів ІМТ
        bmiThresholdCategories: {
            underweight: 16,
            normalWeight: 18.5,
            overweight: 25,
            obesityLevel_1: 30,
            obesityLevel_2: 35,
            obesityLevel_3: 40,
            maxThreshold: 100
        },

        //Об'єкт коефіцієнтів, що використовуються у формулі Брока
        brockCoefficients: {
            male: 0.9,
            female: 0.85
        },

        //Об'єкт коефіцієнтів, що використовуються у формулі Лоренца
        lorenzCoefficients: {
            male: 4,
            female: 2
        },

        //Об'єкт коефіцієнтів, що використовуються у формулі для розрахунку відсотка жиру
        fatPercentageCoefficients: {

            //Коефіцієнти для чоловіків
            male: {
                coefficient_1: 495,
                coefficient_2: 1.0324,
                coefficient_3: 0.19077,
                coefficient_4: 0.15456,
                coefficient_5: 450
            },

            //Коефіцієнти для жінок
            female: {
                coefficient_1: 495,
                coefficient_2: 1.29579,
                coefficient_3: 0.35004,
                coefficient_4: 0.221,
                coefficient_5: 450
            }
        },

        //Об'єкт констант категорій порогів відсотка жиру
        fatThresholdCategories: {

            //Категорії порогів для чоловіків
            male: {
                requiredFatPercentage: 3,
                minimumFatPercentage: 6,
                smallFatPercentage: 12,
                averageBodyFat: 16,
                allowableFatPercentage: 19,
                excessWeight: 25,
                overweight: 40,
                maxFatPercentage: 100,
                idealFatPercentage: 12
            },

            //Категорії порогів для жінок
            female: {
                requiredFatPercentage: 10,
                minimumFatPercentage: 14,
                smallFatPercentage: 17,
                averageBodyFat: 21,
                allowableFatPercentage: 25,
                excessWeight: 31,
                overweight: 45,
                maxFatPercentage: 100,
                idealFatPercentage: 20
            }
        },

        //Об'єкт констант категорій порогів типів статури людини
        somatotypeThresholdCategories: {

            //Категорії порогів для чоловіків
            male: {
                mesomorphThreshold: 17,
                endomorphThreshold: 19
            },

            //Категорії порогів для жінок
            female: {
                mesomorphThreshold: 16,
                endomorphThreshold: 18
            }
        },

        //Об'єкт констант категорій порогів індексів центрального ожиріння
        icoThresholdCategories: {

            //Категорії порогів для співвідношення талії до зросту
            waistHeightRatio: {
                overweight: 0.5
            },

            //Категорії порогів для співвідношення талії до стегон
            waistHipsRatio: {
                overweight: {
                    male: 1,
                    female: 0.85
                }
            }
        }
    },

    //Об'єкт констант, що використовуються для повідомлень про помилку
    errorMessages: {
        bmiCalculation: "BMI_calculation_error",
        bmiCategoryCalculation: "BMI_category_calculation_error",

        minNormalWeightCalculation: "Min_normal_weight_calculation_error",
        maxNormalWeightCalculation: "Max_normal_weight_calculation_error",
        brockWeightCalculation: "Brock_weight_calculation_error",
        lorenzWeightCalculation: "Lorenz_weight_calculation_error",
        
        fatPercentageCalculation: "Fat_percentage_calculation_error",
        totalFatWeightCalculation: "Total_fat_weight_calculation_error",
        fatCategoryCalculation: "Fat_category_calculation_error",
        fatWeightForDietCalculation: "Fat_weight_for_diet_calculation_error",
        stringForDietCalculation: "String_for_diet_calculation_error",

        somatotypeCalculation: "Somatotype_calculation_error",

        waistHeightRatioCalculation: "Waist_height_ratio_calculation_error",
        waistHeightRatioResult: "Waist_height_ratio_result_error",
        waistHipsRatioCalculation: "Waist_hips_ratio_calculation_error",
        waistHipsRatioResult: "Waist_hips_ratio_result_error"
    },


    /*__________ Методи для перевірок значень __________*/

    //Метод перевірки на некоректний результат
    isInvalidArgument: function(argument) {

        //Усі наступні значення аргументів вважаються некоректними
        return argument <= 0 || isNaN(argument) ||
            argument === Infinity || argument === -Infinity ||
            argument === undefined || argument === null;
    },

    //Метод перевіряє на коректність аргументи методів для формул
    validateFormulaData: function () {

        //Перевіряємо кожен аргумент методу
        for (const argument of arguments) {
            if (this.isInvalidArgument(argument)) {
                return false;
            }
        }

        //Якщо всі аргументи коректні вертаємо true
        return true;
    },

    //Метод перевіряє на коректність результати методів та повертає результат або помилку
    validateAndReturnValue: function (methodResult, errorMessage) {
        if (this.isInvalidArgument(methodResult)) {
            return errorMessage; //Повертаємо повідомлення про помилку
        } else {
            return methodResult; //Повертаємо коректний результат
        }
    },


/*__________ Методи/формули для розрахунків значень __________*/

    //Розрахунок ІМТ
    getBmi: function (heightInMeters, weightInKilograms) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.bmiCalculation;

        //Перевіряємо на коректність дані для формули
        if (!this.validateFormulaData(heightInMeters, weightInKilograms)) {
            return ERROR_MESSAGE;
        }

        //Формула для розрахунку ІМТ
        var bmi = weightInKilograms / Math.pow(heightInMeters, 2);

        //Округляємо результат до двох знаків після коми
        var roundedBmi = Math.round(bmi * 100) / 100;

        //Перевіряємо коректність результату та повертаємо результат або помилку
        return this.validateAndReturnValue(roundedBmi, ERROR_MESSAGE);
    },

    //Метод вертає строку категорії, яка відповідає розрахованому ІМТ
    getResultBmi: function (bmi) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.bmiCategoryCalculation;

        //Перевіряємо на коректність дані
        if (!this.validateFormulaData(bmi)) {
            return ERROR_MESSAGE;
        }

        //Отримуємо об'єкт констант категорій порогів ІМТ
        const thresholds = this.constants.bmiThresholdCategories;

        var category;

        if (bmi < thresholds.underweight) {
            category = "гострий дефіцит маси тіла";
        } else if (bmi < thresholds.normalWeight) {
            category = "недостатня маса тіла";
        } else if (bmi < thresholds.overweight) {
            category = "нормальна маса тіла";
        } else if (bmi < thresholds.obesityLevel_1) {
            category = "надмірна маса тіла";
        } else if (bmi < thresholds.obesityLevel_2) {
            category = "ожиріння першого ступеня";
        } else if (bmi < thresholds.obesityLevel_3) {
            category = "ожиріння другого ступеня";
        } else if (bmi < thresholds.maxThreshold) {
            category = "ожиріння третього ступеня";
        } else {
            return ERROR_MESSAGE;
        }

        return category;
    },

    //Розрахунок мінімальної нормальної ваги згідно зросту і ІМТ
    getMinWeight: function (heightInMeters) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.minNormalWeightCalculation;

        //Перевіряємо на коректність дані для формули
        if (!this.validateFormulaData(heightInMeters)) {
            return ERROR_MESSAGE;
        }

        //Отримуємо константу порогу мінімальної нормальної ваги з об'єкту констант категорій порогів ІМТ
        const NORMAL_MINIMUM_BMI_THRESHOLD = this.constants.bmiThresholdCategories.normalWeight;

        //Формула для розрахунку мінімальної нормальної ваги згідно зросту і ІМТ
        var minNormalWeight = NORMAL_MINIMUM_BMI_THRESHOLD * Math.pow(heightInMeters, 2);

        //Округляємо результат
        var roundedMinNormalWeight = Math.round(minNormalWeight);

        //Перевіряємо коректність результату та повертаємо результат або помилку
        return this.validateAndReturnValue(roundedMinNormalWeight, ERROR_MESSAGE);
    },

    //Розрахунок максимальної нормальної ваги згідно зросту і ІМТ
    getMaxWeight: function (heightInMeters) {
        
        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.maxNormalWeightCalculation;

        //Перевіряємо на коректність дані для формули
        if (!this.validateFormulaData(heightInMeters)) {
            return ERROR_MESSAGE;
        }

        //Отримуємо константу порогу максимальної нормальної ваги з об'єкту констант категорій порогів ІМТ
        const NORMAL_MAXIMUM_BMI_THRESHOLD = this.constants.bmiThresholdCategories.overweight;

        //Формула для розрахунку мінімальної нормальної ваги згідно зросту і ІМТ
        var maxNormalWeight = NORMAL_MAXIMUM_BMI_THRESHOLD * Math.pow(heightInMeters, 2);

        //Округляємо результат
        var roundedMaxNormalWeight = Math.round(maxNormalWeight);

        //Перевіряємо коректність результату та повертаємо результат або помилку
        return this.validateAndReturnValue(roundedMaxNormalWeight, ERROR_MESSAGE);
    },

    //Розрахунок ідеальної ваги за формулою Брока
    getIdealWeightBrock: function (heightInCentimeters, gender) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.brockWeightCalculation;

        //Перевіряємо на коректність дані для формули
        if (!this.validateFormulaData(heightInCentimeters) ||
            (gender !== "male" && gender !== "female")) {
            return ERROR_MESSAGE;
        }

        //Отримуємо коефіцієнт для формули Брока щодо статі людини
        const COEFFICIENT = this.constants.brockCoefficients[gender];

        //Формула для розрахунку ідеальної ваги за формулою Брока
        var idealWeightBrock = (heightInCentimeters - 100) * COEFFICIENT;

        //Округляємо результат
        var roundedIdealWeightBrock = Math.round(idealWeightBrock);

        //Перевіряємо коректність результату та повертаємо результат або помилку
        return this.validateAndReturnValue(roundedIdealWeightBrock, ERROR_MESSAGE);
    },

    //Розрахунок ідеальної ваги за формулою Лоренца
    getIdealWeightLorenz: function (heightInCentimeters, gender) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.lorenzWeightCalculation;

        //Перевіряємо на коректність дані для формули
        if (!this.validateFormulaData(heightInCentimeters) ||
            (gender !== "male" && gender !== "female")) {
            return ERROR_MESSAGE;
        }

        //Отримуємо коефіцієнт для формули Лоренца щодо статі людини
        const COEFFICIENT = this.constants.lorenzCoefficients[gender];

        //Формула для розрахунку ідеальної ваги за формулою Лоренца
        var idealWeightLorenz = (heightInCentimeters - 100) - ((heightInCentimeters - 150) / COEFFICIENT);

        //Округляємо результат
        var roundedIdealWeightLorenz = Math.round(idealWeightLorenz);

        //Перевіряємо коректність результату та повертаємо результат або помилку
        return this.validateAndReturnValue(roundedIdealWeightLorenz, ERROR_MESSAGE);
    },

    //Розрахунок відсотка підшкірного жиру за формулою ВМС США
    getFatPercentage: function (heightInCentimeters, waistCircumference, neckCircumference, hipsCircumference, gender) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.fatPercentageCalculation;

        //Перевіряємо на коректність дані для формули
        if (!this.validateFormulaData(heightInCentimeters, waistCircumference, neckCircumference, hipsCircumference) ||
            (gender !== "male" && gender !== "female")) {
            return ERROR_MESSAGE;
        }

        //Якщо стать чоловіча, встановлюємо значення обхвату стегон на 0
        hipsCircumference = (gender === "male" ? 0 : hipsCircumference);

        //Отримуємо коефіцієнти для формули ВМС США щодо статі людини
        const coefs = this.constants.fatPercentageCoefficients[gender];

        //Формула для розрахунку відсотка підшкірного жиру за формулою ВМС США
        var fatPercentage = coefs.coefficient_1 /
            (
                coefs.coefficient_2 -
                coefs.coefficient_3 * Math.log10(waistCircumference + hipsCircumference - neckCircumference) +
                coefs.coefficient_4 * Math.log10(heightInCentimeters)
            ) - coefs.coefficient_5;

        //Округляємо результат до одного знака після коми
        var roundedFatPercentage = Math.round(fatPercentage * 10) / 10;

        //Перевіряємо коректність результату та повертаємо результат або помилку
        return this.validateAndReturnValue(roundedFatPercentage, ERROR_MESSAGE);
    },

    //Розрахунок загальної ваги жиру
    getTotalFatWeight: function (bodyWeight, fatPercentage) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.totalFatWeightCalculation;

        //Перевіряємо на коректність дані для формули
        if (!this.validateFormulaData(bodyWeight, fatPercentage)) {
            return ERROR_MESSAGE;
        }

        const ONE_HUNDRED_PERCENT = 100;

        //Формула для розрахунку загальної ваги жиру
        var totalFatWeight = (fatPercentage * bodyWeight) / ONE_HUNDRED_PERCENT;

        //Округляємо результат до одного знака після коми
        var roundedTotalFatWeight = Math.round(totalFatWeight * 10) / 10;

        //Перевіряємо коректність результату та повертаємо результат або помилку
        return this.validateAndReturnValue(roundedTotalFatWeight, ERROR_MESSAGE);
    },

    //Метод повертає строку категорії, яка відповідає розрахованому відсотку жиру
    getResultFatCategory: function (fatPercentage, gender) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.fatCategoryCalculation;

        //Перевіряємо на коректність дані
        if (!this.validateFormulaData(fatPercentage) ||
            (gender !== "male" && gender !== "female")) {
            return ERROR_MESSAGE;
        }

        //Отримуємо об'єкт констант категорій порогів відсотка жиру щодо статі
        const thresholds = this.constants.fatThresholdCategories[gender];

        var category;

        if (fatPercentage < thresholds.requiredFatPercentage) {
            category = "критично мала кількість життєво необхідного жиру в організмі";
        } else if (fatPercentage < thresholds.minimumFatPercentage) {
            category = "мінімальний відсоток жиру для здорової життєдіяльності організму";
        } else if (fatPercentage < thresholds.smallFatPercentage) {
            category = "невеликий відсоток жиру. Ви спортсмен, маєте підтягнуту атлетичну статуру та рельєфний прес";
        } else if (fatPercentage < thresholds.averageBodyFat) {
            category = "невеликий відсоток жиру. Ви любитель спорту, маєте гарну фізичну форму з наявністю невеликої кількості жирових запасів";
        } else if (fatPercentage < thresholds.allowableFatPercentage) {
            category = "середній рівень жиру. У вас звичайна статура, а також середній рівень фізичної активності";
        } else if (fatPercentage < thresholds.excessWeight) {
            category = "прийнятний рівень жиру. У вас невисокий рівень фізичної форми, можлива наявність жиру в проблемних місцях";
        } else if (fatPercentage < thresholds.overweight) {
            category = "наявність зайвої ваги. У вас погана спортивна форма";
        } else if (fatPercentage < thresholds.maxFatPercentage) {
            category = "надлишковий жир. У вас відсутня спортивна форма";
        } else {
            return ERROR_MESSAGE;
        }

        return category;
    },

    //Розрахунок кількості жиру для дієти
    getFatWeightForDiet: function (gender, bodyWeight, fatPercentage, totalFatWeight) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.fatWeightForDietCalculation;

        //Перевіряємо на коректність дані
        if (!this.validateFormulaData(bodyWeight, fatPercentage, totalFatWeight) ||
            (gender !== "male" && gender !== "female")) {
            return ERROR_MESSAGE;
        }

        //Отримуємо об'єкт констант категорій порогів відсотка жиру щодо статі
        const thresholds = this.constants.fatThresholdCategories[gender];

        const ONE_HUNDRED_PERCENT = 100;

        //Формула для розрахунку того, скільки потрібно скинути або набрати жиру
        var formulaResult =  (bodyWeight * thresholds.idealFatPercentage / ONE_HUNDRED_PERCENT) - totalFatWeight;

        var fatWeightForDiet;

        //Якщо відсоток жиру менше необхідного значення
        if (fatPercentage < thresholds.requiredFatPercentage) {
            fatWeightForDiet = formulaResult; //Повертає додатне число (скільки набрати жиру)
        }

        //Якщо відсоток жиру менше або дорівнює допустимому значенню
        else if (fatPercentage <= thresholds.allowableFatPercentage) {
            fatWeightForDiet = 0; //Повертаємо нуль, бо немає потреби в дієті
        }

        //Якщо відсоток жиру більше допустимого значення
        else if (fatPercentage >= thresholds.allowableFatPercentage) {
            fatWeightForDiet = formulaResult; //Повертає від'ємне число (скільки скинути жиру)
        } 

        else {
            return ERROR_MESSAGE;
        }

        //Округляємо результат до одного знака після коми
        return Math.round(fatWeightForDiet * 10) / 10;
    },

    //Метод вертає строку, яка відповідає необхідній дієті
    getStringForDiet: function (gender, bodyWeight, fatWeightForDiet, totalFatWeight) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.stringForDietCalculation;

        //Перевіряємо на коректність дані
        if (!this.validateFormulaData(bodyWeight, totalFatWeight) ||
            isNaN(fatWeightForDiet) || fatWeightForDiet === undefined ||
            (gender !== "male" && gender !== "female")) {
            return ERROR_MESSAGE;
        }

        //Отримуємо об'єкт констант категорій порогів відсотка жиру щодо статі
        const thresholds = this.constants.fatThresholdCategories[gender];

        var stringResultForDiet;

        if (fatWeightForDiet === 0) {
            stringResultForDiet = "у Вас <b>немає необхідності</b> знижувати вагу. " +
                "Дотримуйтесь правильного харчування та займайтесь спортом для того, щоб підтримувати свою вагу";
        } else if (fatWeightForDiet > 0) {
            stringResultForDiet = "Ви <b>не маєте необхідної кількості жиру</b> для нормального функціювання організму. " +
                "Для того, щоб мати <b>" + thresholds.idealFatPercentage + "</b>%, " +
                "які вважаються ідеальними для Вашої статі, вам потрібно набрати <b>" +
                fatWeightForDiet + "</b> кг жиру. " +
                "Таким чином, Ваша загальна вага буде <b>" + (fatWeightForDiet + bodyWeight) + "</b> кг";
        } else if (fatWeightForDiet < 0) {
            stringResultForDiet = "Ви <b>маєте зайву кількість жиру</b> для організму. " +
                "Для того, щоб мати <b>" + thresholds.idealFatPercentage + "</b>%, " +
                "які вважаються ідеальними для Вашої статі, вам потрібно схуднути на <b>" +
                (-1 * fatWeightForDiet) + "</b> кг. " +
                "Таким чином, Ваша загальна вага буде <b>" + (bodyWeight + fatWeightForDiet) + "</b> кг, з яких <b>" +
                Math.round((totalFatWeight + fatWeightForDiet)) +
                "</b> кг буде складати жир";
        } else {
            return ERROR_MESSAGE;
        }

        return stringResultForDiet;
    },

    //Метод вертає тип статури людини
    getSomatotype: function (forearmGirth, gender) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.somatotypeCalculation;

        //Перевіряємо на коректність дані
        if (!this.validateFormulaData(forearmGirth) ||
            (gender !== "male" && gender !== "female")) {
            return ERROR_MESSAGE;
        }

        //Отримуємо об'єкт констант категорій порогів типів статури людини щодо статі
        const thresholds = this.constants.somatotypeThresholdCategories[gender];
        const MESOMORPH_THRESHOLD = thresholds.mesomorphThreshold;
        const ENDOMORPH_THRESHOLD = thresholds.endomorphThreshold;

        var somatotype;

        if (forearmGirth < MESOMORPH_THRESHOLD) {
            somatotype = "ектоморф";
        } else if (forearmGirth < ENDOMORPH_THRESHOLD) {
            somatotype = "мезоморф";
        } else if (forearmGirth >= ENDOMORPH_THRESHOLD) {
            somatotype = "ендоморф";
        } else {
            return ERROR_MESSAGE;
        }

        return somatotype;
    },

    //Розрахунок співвідношення талії до зросту
    getWaistHeightRatio: function (waistCircumference, heightInCentimeters) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.waistHeightRatioCalculation;

        //Перевіряємо на коректність дані для формули
        if (!this.validateFormulaData(waistCircumference, heightInCentimeters)) {
            return ERROR_MESSAGE;
        }

        //Формула для розрахунку співвідношення талії до зросту
        var waistHeightRatio = waistCircumference / heightInCentimeters;

        //Округляємо результат до трьох знаків після коми
        var roundedWaistHeightRatio = Math.round(waistHeightRatio * 1000) / 1000;

        //Перевіряємо коректність результату та повертаємо результат або помилку
        return this.validateAndReturnValue(roundedWaistHeightRatio, ERROR_MESSAGE);
    },

    //Метод вертає строку, яка відповідає співвідношенню талії до зросту
    getResultWaistHeightRatio: function (waistHeightRatio) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.waistHeightRatioResult;

        //Перевіряємо на коректність дані
        if (!this.validateFormulaData(waistHeightRatio)) {
            return ERROR_MESSAGE;
        }

        //Отримуємо об'єкт констант категорій порогів для співвідношення талії до зросту
        const thresholds = this.constants.icoThresholdCategories.waistHeightRatio;
        const OVERWEIGHT = thresholds.overweight;
        
        return waistHeightRatio < OVERWEIGHT ? "низький" : "високий";
    },

    //Розрахунок співвідношення талії до стегон
    getWaistHipsRatio: function (waistCircumference, hipsСircumference) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.waistHipsRatioCalculation;

        //Перевіряємо на коректність дані для формули
        if (!this.validateFormulaData(waistCircumference, hipsСircumference)) {
            return ERROR_MESSAGE;
        }

        //Формула для розрахунку співвідношення талії до стегон
        var waistHipsRatio = waistCircumference / hipsСircumference;

        //Округляємо результат до трьох знаків після коми
        var roundedWaistHipstRatio = Math.round(waistHipsRatio * 1000) / 1000;

        //Перевіряємо коректність результату та повертаємо результат або помилку
        return this.validateAndReturnValue(roundedWaistHipstRatio, ERROR_MESSAGE);
    },

    //Метод вертає строку, яка відповідає співвідношенню талії до стегон
    getResultWaistHipsRatio: function (waistHipsRatio, gender) {

        //Отримуємо значення для помилки
        const ERROR_MESSAGE = this.errorMessages.waistHipsRatioResult;

        //Перевіряємо на коректність дані
        if (!this.validateFormulaData(waistHipsRatio) ||
            (gender !== "male" && gender !== "female")) {
            return ERROR_MESSAGE;
        }

        //Отримуємо об'єкт констант категорій порогів для співвідношення талії до стегон
        const thresholds = this.constants.icoThresholdCategories.waistHipsRatio;
        const OVERWEIGHT = thresholds.overweight[gender];
        return waistHipsRatio < OVERWEIGHT ? "низький" : "високий";
    }
};

//Об'єкт має набір методів для отримання та перевірки введених значень полів
inputFields = {

    //Метод перевіряє введені значення полів
    checkInputValues: function() {

        //Отримуємо об'єкт всіх полів класу "inputNumber"
        var inputFields = document.getElementsByClassName("inputNumber");

        //Перевіряємо об'єкт inputFields на коректність
        if (inputFields.length === 0) {
            return false;
        }

        //Змінна зберігає значення того, виводимо ми попередження чи ні
        var hasWarnings = false;

        //Перевіряємо кожне поле на коректність введених даних
        for (var fieldNumber = 0; fieldNumber < inputFields.length; fieldNumber++) {

            //Отримуємо значення даних із поля
            var fieldValue = inputFields[fieldNumber].value;

            //Якщо поле буде одним із наступних значень, визвати метод, який виведе відповідне попередження
            if (fieldValue === "") {
                view.outputWarning("Заповніть поле!", fieldNumber);
                hasWarnings = true;
            } else if (fieldValue === "0") {
                view.outputWarning("Значення не може дорівнювати нулю!", fieldNumber);
                hasWarnings = true;
            } else if (fieldValue < 0) {
                view.outputWarning("Значення не може бути від'ємним!", fieldNumber);
                hasWarnings = true;
            } else {
                view.outputWarning("", fieldNumber);
            }
        }

        //Якщо є попередження - вертаємо false, інакше вертаємо true
        return !hasWarnings;
    },

    //Метод вертає значення поля введення за його ID
    getValueOfInputField: function (elementId) {

        //Отримуємо об'єкт елемента за його ID
        var element = document.getElementById(elementId);

        //Перевіряємо об'єкт елемента на коректність, та повертаємо false або його значення
        if (element === null) {
            return false;
        } else {
            return element.value;
        }
    },


    /*__________ Методи для отримання значень полів __________*/

    //Метод повертає значення статі користувача
    getValueOfTypeGender: function () {

        //Отримуємо об'єкт всіх елементів input (radio) з ім'ям "typeGender"
        var genderInputs = document.getElementsByName("typeGender");

        //Перевіряємо об'єкт genderInputs на коректність
        if (genderInputs.length === 0) {
            return false;
        }

        //Шукаємо обраний елемент та повертаємо його значення
        for (let i = 0; i < genderInputs.length; i++) {
            if (genderInputs[i].checked) {
                return genderInputs[i].value;
            }
        }

        //Якщо обраного елемента немає - вертаємо false
        return false;
    },

    //Метод повертає значення ваги користувача
    getValueOfWeight: function() {
        return parseFloat(this.getValueOfInputField("weightInputField"));
    },

    //Метод повертає значення зросту користувача
    getValueOfHeight: function() {
        return parseFloat(this.getValueOfInputField("heightInputField"));
    },

    //Метод повертає значення обхвату шиї
    getValueOfNeckCircumference: function() {
        return parseFloat(this.getValueOfInputField("neckCircumferenceInputField"));
    },

    //Метод повертає значення обхвату передпліччя
    getValueOfForearmGirth: function() {
        return parseFloat(this.getValueOfInputField("forearmGirthInputField"));
    },

    //Метод повертає значення обхвату талії
    getValueOfWaistCircumference: function() {
        return parseFloat(this.getValueOfInputField("waistCircumferenceInputField"));
    },

    //Метод повертає значення обхвату стегон
    getValueOfHipsCircumference: function() {
        return parseFloat(this.getValueOfInputField("hipsCircumferenceInputField"));
    }
};

//Об'єкт має набір методів, які змінюють DOM
view = {

    //Метод виводить попередження для поля введення даних
    outputWarning: function (stringWarning, warningFieldNumber) {

        //Отримуємо об'єкт всіх блоків класу "outputWarning"
        var warnings = document.getElementsByClassName("outputWarning");

        //Перевіряємо об'єкт warnings на коректність
        if (warnings.length === 0) {
            return false;
        }

        //Отрумуємо об'єкт блоку за його номером
        var warning = warnings[warningFieldNumber];

        //Перевіряємо об'єкт warning на коректність
        if (warning === null) {
            return false;
        }

        //Додаємо в зміст нашого блоку строку попередження
        warning.innerHTML = stringWarning;

        return true;
    },

    //Метод виводить результат розрахування одного із значень
    outputResultMeaning: function (elementId, resultString) {

        //Отримуємо об'єкт елемента за його ID
        var element = document.getElementById(elementId);

        //Перевіряємо об'єкт елемента на коректність
        if (element === null) {
            return false;
        } 

        //Додаємо в зміст нашого блоку строку (результат)
        element.innerHTML = resultString;

        return true;
    },

    outputResultSomatotype: function (type) {

        //Змінна, що зберігатиме ID необхідного списку
        var listId;

        if (type === "ектоморф") {
            listId = "listForEctomorph";
        } else if (type === "мезоморф") {
            listId = "listForMesomorph";
        } else if (type === "ендоморф") {
            listId = "listForEndomorph";
        } else {
            return false;
        }

        //Робимо блок списку видимим
        this.makeOutputResultsVisible(listId);
        return true;
    },

    //Метод робить видимим блок результатів
    makeOutputResultsVisible: function(blockId) {

        //Отримуємо об'єкт блоку
        var block = document.getElementById(blockId);

        //Перевіряємо об'єкт елемента на коректність
        if (block === null) {
            return false;
        } 

        //Робимо блок видимим
        block.style.display = "block";

        return true;
    }
};

//Функція отримує значення полів, розраховує значення та виводе їх
function mainFunction() {

    /*__________ Отримуємо значення кожного поля введення __________*/

    const gender = inputFields.getValueOfTypeGender();
    const weightInKilograms = inputFields.getValueOfWeight();
    const heightInCentimeters = inputFields.getValueOfHeight();
    const neckCircumference = inputFields.getValueOfNeckCircumference();
    const forearmGirth = inputFields.getValueOfForearmGirth();
    const waistCircumference = inputFields.getValueOfWaistCircumference();
    const hipsCircumference = inputFields.getValueOfHipsCircumference();


    /*__________ Розраховуємо значення і виводимо їх __________*/

    var bmi = calculations.getBmi(heightInCentimeters / 100, weightInKilograms);
    view.outputResultMeaning("calculatedBmi", bmi);

    var resultBmi = calculations.getResultBmi(bmi);
    view.outputResultMeaning("resultCategoryBmi", resultBmi);

    var minWeight = calculations.getMinWeight(heightInCentimeters / 100);
    view.outputResultMeaning("calculatedMinNormalWeight", minWeight);

    var maxWeight = calculations.getMaxWeight(heightInCentimeters / 100);
    view.outputResultMeaning("calculatedMaxNormalWeight", maxWeight);

    var idealWeightBrock = calculations.getIdealWeightBrock(heightInCentimeters, gender);
    view.outputResultMeaning("calculatedIdealWeightBrock", idealWeightBrock);

    var idealWeightLorenz = calculations.getIdealWeightLorenz(heightInCentimeters, gender);
    view.outputResultMeaning("calculatedIdealWeightLorenz", idealWeightLorenz);

    var fatPercentage = calculations.getFatPercentage(heightInCentimeters, waistCircumference, neckCircumference, hipsCircumference, gender);
    view.outputResultMeaning("calculatedPercentFat", fatPercentage);

    var totalFatWeight = calculations.getTotalFatWeight(weightInKilograms, fatPercentage);
    view.outputResultMeaning("calculatedWeightFat", totalFatWeight);

    var resultFatCategory = calculations.getResultFatCategory(fatPercentage, gender);
    view.outputResultMeaning("resultFatCategory", resultFatCategory);

    var fatWeightForDiet = calculations.getFatWeightForDiet(gender, weightInKilograms, fatPercentage, totalFatWeight);
    var stringForDiet = calculations.getStringForDiet(gender, weightInKilograms, fatWeightForDiet, totalFatWeight);
    view.outputResultMeaning("resultFatDiet", stringForDiet);

    var somatotype = calculations.getSomatotype(forearmGirth, gender);
    view.outputResultMeaning("calculatedSomatotype", somatotype);
    view.outputResultSomatotype(somatotype);

    var waistHeightRatio = calculations.getWaistHeightRatio(waistCircumference, heightInCentimeters);
    view.outputResultMeaning("calculatedWaistHeightRatio", waistHeightRatio);

    var resultWaistHeightRatio = calculations.getResultWaistHeightRatio(waistHeightRatio);
    view.outputResultMeaning("resultWaistHeightRatio", resultWaistHeightRatio);
    view.outputResultMeaning("resultWaistHeightRatio_s", resultWaistHeightRatio);

    var waistHipsRatio = calculations.getWaistHipsRatio(waistCircumference, hipsCircumference);
    view.outputResultMeaning("calculatedWaistHipsRatio", waistHipsRatio);

    var resultWaistHipsRatio = calculations.getResultWaistHipsRatio(waistHipsRatio, gender);
    view.outputResultMeaning("resultWaistHipsRatio", resultWaistHipsRatio);
    view.outputResultMeaning("resultWaistHipsRatio_s", resultWaistHipsRatio);

    //Робимо видимим блок результатів
    view.makeOutputResultsVisible("outputBlockResults");

    return true;
}

window.onload = function () {
    var calculateButton = document.getElementById("calculateButton");

    calculateButton.onclick = function () {
        if (inputFields.checkInputValues() === true) {
            mainFunction();
        }
    };
};