<template>
    <div class="profile-container">
        <h2>Профиль</h2>
        <div class="stats-card">
            <div class="stat-item">
                <span class="stat-label">Изучено слов:</span>
                <span class="stat-value">{{ stats.learned }}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">В повторении:</span>
                <span class="stat-value">{{ stats.inRepeat }}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Уровень:</span>
                <span class="stat-value">{{ stats.level }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileView',
    data() {
        return {
            stats: {
                learned: 0,
                inRepeat: 0,
                level: 'Новичок'
            }
        }
    },
    async mounted() {
        await this.fetchStats();
    },
    methods: {
        async fetchStats() {
            try {
                const tg_user = window.Telegram.WebApp.initDataUnsafe?.user;
                const response = await fetch(`https://jubilant-palm-tree-jjvgqggwxq7244w-8000.app.github.dev/stats/${tg_user.id}`);
                const data = await response.json();
                
                this.stats = {
                    learned: data.learnedCount,
                    inRepeat: data.repeatCount,
                    level: this.calculateLevel(data.learnedCount)
                };
            } catch (error) {
                console.error('Ошибка:', error);
            }
        },
        
        calculateLevel(learned) {
            if(learned >= 100) return 'Эксперт';
            if(learned >= 50) return 'Продвинутый';
            if(learned >= 20) return 'Средний';
            return 'Новичок';
        }
    }
}
</script>

<style scoped>
.profile-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
}

.stats-card {
    background-color: #ffffffcc;
    backdrop-filter: blur(8px);
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    padding: 12px;
    background-color: #f5f5f5;
    border-radius: 8px;
}

.stat-label {
    font-weight: 500;
    color: #666;
}

.stat-value {
    font-weight: 600;
    color: #007aff;
}
</style>