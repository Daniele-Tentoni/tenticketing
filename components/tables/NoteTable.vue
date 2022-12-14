<template>
  <div>
    <div
      v-if="notesExists"
      class="table-container"
    >
      <table class="table is-bordered is-striped is-fullwidth">
        <thead>
          <TbRow>
            <TbH label="Subject" />
            <TbH>Value</TbH>
          </TbRow>
        </thead>
        <tbody>
          <TbRow
            v-for="note, i in filteredNotes"
            :key="i"
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
            <p class="title has-background-dark has-text-light">
              Empty Notes
            </p>
            <p class="subtitle has-background-dark has-text-light">
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
import Note from '~~/models/note';
import TbH from './TbH.vue';
import TbRow from './TbRow.vue';

interface Props {
  notes: Note[];
}

const props = withDefaults(defineProps<Props>(), { notes: () => [], });

const notesExists = computed(() => filteredNotes.value.length > 0);

const filteredNotes = computed(() => {
  if (props.notes.length === 0) {
    console.debug('Props.notes is empty');
  }

  return props.notes;
});

/*
function notesSort (a: Note, b: Note) {
  const subjectCompare = a.subject.localeCompare(b.subject);
  if (subjectCompare !== 0) return subjectCompare;
  if (a.value < b.value) return -1;
  if (a.value > b.value) return 1;
  return 0;
}
*/
</script>
