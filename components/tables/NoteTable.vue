<template>
  <div>
    <div
      v-if="notesExists"
      class="table-container"
    >
      <table class="table is-bordered is-striped is-fullwidth">
        <thead>
          <TbH>Subject</TbH>
          <TbH>Value</TbH>
        </thead>
        <tbody>
          <TbRow
            v-for="note in filteredNotes"
            :key="note.id"
          >
            <td>{{ note.subject }}</td>
            <td>{{ note.value }}</td>
          </TbRow>
        </tbody>
      </table>
    </div>
    <div v-else>
      <slot name="emptyTable">
        <div class="columns is-mobile">
          <div class="column">
            <p class="title">
              Empty Notes
            </p>
            <p class="subtitle">
              You can start adding notes to a ticket.
            </p>
          </div>
          <div class="column" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useNotes from '~~/composables/useNotes';
import Note from '~~/models/note';
import TbH from './TbH.vue';
import TbRow from './TbRow.vue';

const notes = useNotes();

const notesExists = computed(() => filteredNotes.value.length > 0);

const filteredNotes = computed(() => notes.value.sort(function (a: Note, b: Note) {
  const subjectCompare = a.subject.localeCompare(b.subject);
  if (subjectCompare !== 0) return subjectCompare;
  if (a.value < b.value) return -1;
  if (a.value > b.value) return 1;
  return 0;
}));
</script>
