"use client"
import { getSemesterById } from "@/app/actions/semester";
import { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import LoadingPage from "../LoadingPage";
import { getRekapMengawas } from "@/app/actions/rekapmengawas";
import { getUser } from "@/app/actions/user";
import generatePDF, { Margin, Resolution, usePDF } from "react-to-pdf";

export default function PDFRekapMengawasTest({rekap,masaujian,semester}){

    const styles = StyleSheet.create({
        page: { marginVertical:"0.5cm", paddingVertical:"0.5cm", border:"1cm solid white", borderBottom:"2cm solid white", borderTop:"0.5cm solid white" },
        table: { display: "flex", width: '100%', flexDirection:"column", alignItems:"center", fontSize:"10px"  },
        tableRow: { flexDirection: 'row' },
        tableCell: { padding: 3, textAlign:"left", width:"90px", borderRight:"2px solid black", borderBottom:"2px solid black" },
        tableFirst: { padding: 3, borderLeft:"2px solid black",borderBottom:"2px solid black",borderRight:"2px solid black" ,textAlign: 'left', width:"110px" },
        tableHeaderFirst: { padding: 3, border:"2px solid black" ,textAlign: 'left', width:"110px", fontWeight:"bold"},
        tableHeaderCell: {padding: 3, textAlign:"left", width:"90px", borderRight:"2px solid black", borderBottom:"2px solid black", borderTop:"2px solid black"}
    });

    return(
        <>
            {/* <button className="btn btn-dark mx-1 my-1" onClick={()=>generatePDF(targetRef,options)} style={{backgroundColor:"#272829"}}><strong>Cetak Rekap Mengawas</strong></button> */}
            <Document>
                <Page style={styles.page} size="A4">
                    <View style={styles.table}>
                        <Text style={{fontSize:20,marginVertical:5}}>
                            Rekap Mengawas
                        </Text>
                        <Text style={{fontSize:18,marginVertical:5}}>
                            {masaujian+" "+semester}
                        </Text>
                        <Text style={{fontSize:12,marginVertical:5}}>
                            Fakultas Teknologi Informasi dan Sains
                        </Text>
                        <Text style={{fontSize:12,marginBottom:8, marginTop:1}}>
                            Universitas Katolik Parahyangan
                        </Text>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeaderFirst}>
                                Nama Dosen
                            </Text>
                            <Text style={styles.tableHeaderCell}>
                                Kuota Mengawas
                            </Text>
                            <Text style={styles.tableHeaderCell}>
                                Jumlah Mengawas
                            </Text>
                            <Text style={styles.tableHeaderCell}>
                                Sisa Mengawas
                            </Text>
                            <Text style={styles.tableHeaderCell}>
                                Kuota Selanjutnya
                            </Text>
                        </View>
                        {rekap.map((rek) => (
                        <View style={styles.tableRow} wrap={false}>
                            <Text key={rek.id} style={styles.tableFirst}>
                                {rek.nama}
                            </Text>
                            <Text key={rek.id} style={styles.tableCell}>
                                {rek.kuotaMengawas}
                            </Text>
                            <Text key={rek.id} style={styles.tableCell}>
                                {rek.jumlahMengawas}
                            </Text>
                            <Text key={rek.id} style={styles.tableCell}>
                                {rek.sisaMengawas}
                            </Text>
                            <Text key={rek.id} style={styles.tableCell}>
                                {rek.kuotaSelanjutnya}
                            </Text>
                        </View>
                        ))}
                    </View>
                </Page>
            </Document>
        </>
    )
}

{/* <Document>
                <Page style={styles.page}>
                <View style={styles.table}>
                    {rekap.map((rek) => (
                    <View key={row.id} style={styles.tableRow}>
                        <Text key={rek.id} style={styles.tableCell}>
                            {rek.nama}
                        </Text>
                    </View>
                    ))}
                </View>
                </Page>
            </Document> */}