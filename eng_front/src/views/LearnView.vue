<template>
    <div class="learn-container">
        <div class="learn-header">
            <h2>Изучение слов</h2>
            <div class="progress">Изучено слов: {{ learnedCount }}</div>
        </div>

        <div v-if="currentWord" class="word-card">
            <div class="word-eng">{{ currentWord.word_eng }}</div>
            <div v-if="showTranslation" class="word-rus">{{ currentWord.word_rus }}</div>
            
            <div class="controls">
                <button 
                    v-if="!showTranslation"
                    @click="showTranslation = true"
                    class="show-translation-btn">
                    Показать перевод
                </button>
                
                <div v-else class="answer-buttons">
                    <button 
                        @click="handleAnswer(true)"
                        class="correct-btn">
                        Правильно
                    </button>
                    <button 
                        @click="handleAnswer(false)"
                        class="wrong-btn">
                        Ошибся
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="no-words">
            Поздравляем! Вы изучили все доступные слова 🎉
        </div>
    </div>
</template>

<script>
export default {
    name: 'LearnWordsView',
    data() {
        return {
            currentWord: null,
            showTranslation: false,
            learnedCount: 0
        }
    },
    async mounted() {
        await this.fetchWord();
        await this.fetchStats();
    },
    methods: {
        async fetchWord() {
            try {
                const tg_user = window.Telegram.WebApp.initDataUnsafe?.user;
                const response = await fetch(`https://jubilant-palm-tree-jjvgqggwxq7244w-8000.app.github.dev/quiz/${tg_user.id}`);
                const data = await response.json();

                if(data.error) {
                    this.currentWord = null;
                } else {
                    this.currentWord = data;
                    this.showTranslation = false;
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        },

        async fetchStats() {
            try {
                const tg_user = window.Telegram.WebApp.initDataUnsafe?.user;
                const response = await fetch(`https://jubilant-palm-tree-jjvgqggwxq7244w-8000.app.github.dev/stats/${tg_user.id}`);
                const data = await response.json();
                this.learnedCount = data.learnedCount;
            } catch (error) {
                console.error('Ошибка:', error);
            }
        },

        async handleAnswer(isCorrect) {
            try {
                const tg_user = window.Telegram.WebApp.initDataUnsafe?.user;
                await fetch('https://jubilant-palm-tree-jjvgqggwxq7244w-8000.app.github.dev/answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tg_id: tg_user.id,
                        word_id: this.currentWord.word_id,
                        was_in_repeat: this.currentWord.was_in_repeat
                    })
                });
                
                await this.fetchWord();
                await this.fetchStats();
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
    }
}
</script>

<style scoped>
.learn-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
}

.learn-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.progress {
    background-color: #007aff;
    color: white;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 14px;
}

.word-card {
    background-color: #ffffffcc;
    backdrop-filter: blur(8px);
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    text-align: center;
}

.word-eng {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 16px;
}

.word-rus {
    font-size: 24px;
    color: #666;
    margin-bottom: 24px;
}

.controls {
    margin-top: 20px;
}

.show-translation-btn {
    background-color: #007aff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
}

.answer-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.correct-btn {
    background-color: #34C759;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
}

.wrong-btn {
    background-color: #FF3B30;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
}

.no-words {
    text-align: center;
    font-size: 20px;
    color: #666;
    padding: 40px 20px;
}
</style>