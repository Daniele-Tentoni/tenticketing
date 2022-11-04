<template>
  <div>
    <div class="table-container" v-if="filteredTickets.length > 0">
      <table class="table is-bordered is-striped is-fullwidth">
        <thead>
          <tr>
            <th class="has-background-dark has-text-light">Data</th>
            <th class="has-background-dark has-text-light">Commessa</th>
            <th class="has-background-dark has-text-light">Ore</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="has-background-dark has-text-light"
          >
            <td>{{ ticket.data?.toLocaleDateString() }}</td>
            <td>{{ ticket.commessa }}</td>
            <td>{{ ticket.ore }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <slot name="emptyTable">
        <div class="columns is-mobile">
          <div class="column">Empty Tickets</div>
          <div class="column"></div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Ticket from "../models/ticket";

const tickets = useTickets();

const filteredTickets = computed(() =>
  tickets.value.sort(function (a: Ticket, b: Ticket) {
    if (a.data === undefined) return 1;
    else if (b.data === undefined) return -1;
    else if (a.data > b.data) return -1;
    else if (a.data < b.data) return 1;
    return a.commessa.localeCompare(b.commessa);
  })
);
</script>
