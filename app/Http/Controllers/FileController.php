<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use File;

class FileController extends Controller
{
    public function save(Request $request)
    {
    	// dd($request->all());
    	if($request->type == 'json') return $this->generateJson($request->list);
    	if($request->type == 'csv') return $this->generateCsv($request->list);
        if($request->type == 'xml') return $this->generateXml($request->list);

    }

    public function generateJson($json)
    {
        $filename = './upload/'.time().'file.json';
        $handle = fopen($filename, 'w+');
        fputs($handle, json_encode($json));
        fclose($handle);
        $headers = array('Content-type'=> 'application/json');
        return response()->download($filename);
    }

    public function generateCsv($list)
    {
    	$keys = array_keys($list[0]);
    	$csv = '';
    	foreach($keys as $key) {
    		$csv .= ucfirst($key).',';
    	}
        $csv = rtrim($csv, ",")."\n";
        foreach($list as $item) {
            foreach($item as $i) {
                $csv .= $i.',';
            }
            $csv = rtrim($csv, ",")."\n";
        }
        $filename = './upload/'.time().'file.csv';

        
        $handle = fopen($filename, 'w+');
        fputs($handle, $csv);
        fclose($handle);
        $headers = array('Content-type'=> 'application/json');
        return response()->download($filename);
    }

    public function generateXml($list)
    {
        $xml = "<?xml version='1.0' encoding='UTF-8'?>\r\n<root>";
        foreach($list as $item) {
            $xml .= "<element>\r\n";
            foreach($item as $key => $val) {
                $xml .= "<".$key.">".$val."</".$key.">\r\n";
            }
            $xml .= "</element>\r\n";

        }
        $xml .= "</root>\r\n";
        $filename = './upload/'.time().'.xml';
        $handle = fopen($filename, 'w+');
        fputs($handle, $xml);
        fclose($handle);
        $headers = array('Content-type'=> 'application/json');
        return response()->download($filename);
    }
}
