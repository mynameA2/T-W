<template>
  <div class="account-page">
    <button @click="auth.logout">Выход</button>
    <div class="filter-dropdown">
      <button @click="toggleDropdown" class="filter-button">Фильтр</button>
      <div v-if="showDropdown" class="filter-panel">
        <label>Статус:</label>
        <Multiselect
          v-model="selectedStatus"
          :options="statuses"
          :multiple="true"
          placeholder="Выберите статус"
          track-by="value"
          label="label"
          :close-on-select="false"
        />
        <label>Дата создания:</label>
        <input type="date" v-model="selectedDate" />
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Статус</th>
          <th>Создан</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.status }}</td>
          <td>{{ user.data_created }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useTableStore } from "@/stores/data";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

definePageMeta({ middleware: "auth" });

const auth = useAuthStore();
const table = useTableStore();

const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const selectedStatus = ref<{ label: string; value: string}[]>([]);
const selectedDate = ref<string | null>(null);
const statuses = [
  { label: "Активен", value: "активен" },
  { label: "Неактивен", value: "неактивен" },
];

const filteredUsers = computed(() => {
  return table.users.filter((user) => {
    const created = user.data_created || "";
    const status = user.status?.toLowerCase() || "";
    const dateMatch =
      !selectedDate.value ||
        created.includes(selectedDate.value.split("-").reverse().join("."));
console.log("user.status:", user.status);
    const statusMatch =
      selectedStatus.value.length === 0 ||
      selectedStatus.value.some((s) => s.value === status);
    return dateMatch && statusMatch;
  });
});

onMounted(() => {
  table.loadUsers();
});
</script>

<style scoped lang="scss">
.account-page {
  padding: 20px;
  .multiselect {
    min-width: 200px;
  }

  .filters {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .filter-dropdown {
    position: relative;
    .filter-button {
      padding: 0.5rem 1rem;
      background-color: #88b337;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .filter-panel {
      margin-top: 1rem;
      background: #f8f8f8;
      padding: 1rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 300px;

      label {
        font-weight: bold;
        margin-bottom: 0.3rem;
      }

      .multiselect {
        min-height: 38px;
        font-size: 14px;

        .multiselect__select {
            height: 38px;
        }

        .multiselect__tags {
            min-height: 38px;
            padding: 6px 10px;
        }
      }

      input[type="date"] {
        padding: 6px 10px;
        margin: auto;
        width: 280px;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      background: #f4f4f4;
    }
  }
}
</style>
