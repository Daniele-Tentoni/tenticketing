<template>
  <div>
    <div
      v-if="filteredTickets.length > 0"
      class="table-container"
    >
      <table class="table is-bordered is-striped is-fullwidth">
        <thead>
          <tr class="has-background-dark">
            <TbH>Data</TbH>
            <TbH>Commessa</TbH>
            <TbH>Ore</TbH>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="has-background-dark has-text-light"
          >
            <td>{{ ticket.data?.toLocaleDateString() }}</td>
            <td>
              <a @click="showNotes(ticket)">{{ ticket.commessa }}</a>
            </td>
            <td>{{ ticket.ore }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <slot name="emptyTable">
        <div class="columns is-mobile">
          <div class="column">
            <p class="title has-background-dark has-text-light">
              Empty Tickets
            </p>
            <p class="subtitle has-background-dark has-text-light">
              You can start creating a ticket clicking on the bottom on the bottom right corner.
            </p>
          </div>
          <div class="column" />
        </div>
      </slot>
    </div>
    <div>
      <NoteTable :notes="notes" />
    </div>
    <div>
      <button
        class="button"
        @click="noteVisible = true"
      >
        Add note
      </button>
      <AddNoteModal
        :id="selectedTicket"
        v-model:visible="noteVisible"
        :user="user"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddNoteModal from '@/components/note/AddNoteModal.vue';
import NoteTable from '../components/tables/NoteTable.vue';
import Ticket from '../models/ticket';
import TbH from './tables/TbH.vue';

const notes = useNotes();
const tickets = useTickets();
const user = useUser();

const filteredTickets = computed(() =>
  tickets.value.sort(function (a: Ticket, b: Ticket) {
    if (a.data === undefined) return 1;
    else if (b.data === undefined) return -1;
    else if (a.data > b.data) return -1;
    else if (a.data < b.data) return 1;
    return a.commessa.localeCompare(b.commessa);
  }),
);

const selectedTicket = ref('');
const noteVisible = ref(false);

function showNotes (ticket: Ticket) {
  const effectiveNotes = ticket?.notes ?? [];
  console.log('Show notes', ticket, effectiveNotes);
  notes.value = effectiveNotes;
  selectedTicket.value = ticket.id;
}
</script>
