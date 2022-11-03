<template>
  <div>
    <div>
      <form>
        <div class="field">
          <label for="commessa">Commessa</label>
          <input type="text" name="commessa" v-model="commessa" />
        </div>
        <div class="buttons">
          <button type="submit" @click="tick">Tick</button>
        </div>
      </form>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Commessa</th>
            <th>Ore</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in filteredTickets" :key="ticket.id">
            <td>{{ ticket.data }}</td>
            <td>{{ ticket.commessa }}</td>
            <td>{{ ticket.ore }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';

interface Ticket {
  id: number,
  data: Date,
  commessa: string,
  ore: number
}

const commessa = ref('');
const tickets: Ref<[Ticket]> = ref();
const filteredTickets = computed(() => tickets.value);

function tick() {
  console.log("Ticket made");
}
</script>